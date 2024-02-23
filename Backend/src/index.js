// 여기를 수정해주세요
const API_KEY = "1e780cdcdf5762aa8f1a5d61afdae672";
const SCHOOL_URL = "https://school.cbe.go.kr/jcjeil-h/M01030701/list";

var express = require('express');
const cors = require('cors');
const axios = require("axios").default;
const cheerio = require("cheerio");
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const port = 7773;

app.use(bodyParser.json(), cors());

const getHtml = async (date) => {
    return await axios.get(SCHOOL_URL, {params: {ymd: date}});
};

// 메인페이지
app.get("/", (req, res) => {
    res.send("jcjeil-backend\n여긴 어떻게 찾아오셨죠?")
});

// date = YYYYMMDD
app.get("/menu", async (req, res) => {
    let current_date = new Date();

    var target_date = req.query.date ?? current_date.getFullYear()
	+ ( (current_date.getMonth()+1) < 9 ? "0" + (current_date.getMonth()+1) : (current_date.getMonth()+1) )
	+ ( (current_date.getDate()) < 9 ? "0" + (current_date.getDate()) : (current_date.getDate()) );

    console.log(`급식 요청 :: ${target_date} 응답 대기 중`);
    try {
        getHtml(target_date).then(html => {
            let ulList = {};
            const content = cheerio.load(html.data);
            const target = content("ul.tch-lnc-list").children("li.tch-lnc-wrap");

            target.each(function(i, elem) {
                const raw_data = content(this).find('dl').find("dd.tch-lnc").find("ul").children("li").text();
                // console.log(raw_data);
                ulList[content(this).find('dl').find("dt").text()] = raw_data.replace("  ", " ").split(" ")
                .map(str => str.trim().split(')').pop().replace("\n", ""))
                .filter(value => value !== "");
            });

            return ulList;
        }).then(data => {
            console.log(data);
            data.date = target_date;
            res.send(data);
            console.log(`급식 요청 :: ${target_date} 응답 성공`);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch menu data' });
        console.log(`급식 요청 :: ${target_date} 응답 실패`);
    }
});


// default geolocation : 37.1596959, 128.2216388
app.get('/weather', async (req, res) => {
    const lat = req.query.lat ?? 37.1596959;
    const lon = req.query.lon ?? 128.2216388;
    console.log(`날씨 요청 :: [${lat}, ${lon}] 날씨 정보를 얻는 중`);

    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=30&units=metric&lang=kr`;

    const weather_names = {
        "Thunderstorm" : "폭우",
        "Drizzle" : "약한 비",
        "Rain" : "비",
        "Snow" : "눈",
        "Atmosphere" : "대기",
        "Clear" : "맑음",
        "Clouds" : "흐림",
    };

    const day_names = ["일","월","화","수","목","금","토","일"];

    const current_date = new Date();
    const tomorrow_date = new Date(
        current_date.getFullYear().toString(),
        current_date.getMonth().toString(),
        (current_date.getDate()+1).toString(),
        0,0,0
    );

    console.log(current_date.toString(), tomorrow_date.toString());

    fetch(URL).then(response => response.json()).then(data => {
        let modified_data = data.list.map((el) => {
            let split_date = el.dt_txt.split(' ');
            let YYYYMMDD = split_date[0].split('-');
            let hh = split_date[1].split(':')[0];

            let date = new Date(
                YYYYMMDD[0], (parseInt(YYYYMMDD[1])-1).toString(), YYYYMMDD[2],
                hh, "0","0"
            );
            
            // null을 반환해야하는 조건 (데이터 시작은 내일부터여야함)
            if ((current_date.getDate() >= date.getDate()) && (date < tomorrow_date)) {
                return false;
            }

            let new_data = {
                date: {
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    day: date.getDate(),
                    day_name: day_names[date.getDay()],
                    hour: date.getHours()
                },
                temp: parseInt(el.main.temp.toFixed(0)),
                weather: {
                    status: weather_names[el.weather[0].main],
                    desc: el.weather[0].description,
                    icon: el.weather[0].icon.replace("n", "").replace("d", "")
                }
            };

            return new_data;
        }); // array.map()
        
        let final = modified_data.filter((element) => element !== false)

        let smallestObject = final.reduce((min, obj) => obj.temp <= min.temp ? obj : min, final[0]);
        let largestObject = final.reduce((max, obj) => obj.temp >= max.temp ? obj : max, final[0]);

        final.unshift({
            low: smallestObject.temp ?? 0,
            high: largestObject.temp ?? 0
        })
        

        res.send(final);
        console.log(`날씨 요청 :: [${lat}, ${lon}] 응답 성공`);

    }); // fetch()
}); // app.get()

app.get('/geolocation', async (req, res) => {
    console.log("Geolocation 요청");
    res.sendFile(path.join(__dirname, './route/geolocation.html'));
});

// 설정 파일 경로
const settingFilePath = 'setting.json';

// JSON 파일 읽기
app.get('/setting/read', (req, res) => {
    fs.readFile(settingFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        else {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
            console.log("설정 데이터 응답 성공");
        }
    });
});
  
// JSON 파일 쓰기
app.post('/setting/write', (req, res) => {
    let newData = req.body;
    // console.log(JSON.stringify(newData, null, 4));

    fs.writeFile(settingFilePath, JSON.stringify(newData, null, 4), 'utf8', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        else {
            console.log("설정 데이터 저장 성공");
            res.status(200).json({ message: 'Data updated successfully' });
        }
    });
});

app.get('/setting/reset', (req, res) => {
    console.warn('setting.json 리셋 시도');

    const initData = {
        "banners": ["1.png", "2.png", "3.png"],
        "call_start": {
          "hour": 12,
          "minute": 20
        },
        "order": [
          ["3", "#0984e3"],
          ["2", "#00b894"],
          ["1", "#fd79a8"]
        ],
        "show_second": [
          30,
          20,
          10
        ],
        "delay": [
          10,
          20,
          30
        ],
        "is_mute": false,
        "voice": "Note",
        "geolocation": {
          "lat": null,
          "lon": null
        },
        "last_save": {
          "year": 2024, "month": 1, "day": 31,
          "hour": 9, "minute": 30, "second": 0
        }
      }

    if (!req.query.confirm) {
        res.status(500).send("Cannot Reset. Need to confirm. Please try again with confirm param");
        console.error('setting.json 리셋 승인 실패');
    }
    else if (req.query.confirm == "true") {
        fs.writeFile(settingFilePath, JSON.stringify(initData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                console.error('setting.json 리셋 실패');
            }
            else {
                res.send('JSON Reset successfully!');
                console.info('setting.json 리셋 완료');
            }
        });
    }
    else {
        res.status(500).send("Cannot Reset. Need confirm=true");
        console.error('setting.json 리셋 승인 실패');
    }
});

app.get('/server-status', (req, res) => {
    res.json({ status: '통신 성공', color: 'green' });
    console.log(`서버 상태 요청 :: 응답 성공`);
});


const storage = multer.diskStorage({
    destination: 'banners/',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

const upload = multer({ storage });
app.post('/banner/upload', upload.array('files'), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    const filenames = req.files.map(file => file.filename);
    res.send('Files uploaded successfully: ' + filenames.join(', '));
});

// 특정 폴더의 파일 리스트를 가져오는 함수
function getFilesList(folderPath) {
    return fs.readdirSync(folderPath);
  }
  
// 정적 파일 서비스 설정
app.use('/banners', express.static('banners'));
app.get('/banner/list', (req, res) => {
    const folderPath = './banners'; // 특정 폴더 경로로 변경
  
    // 폴더가 존재하는지 확인
    if (fs.existsSync(folderPath)) {
        const filesList = getFilesList(folderPath);

        if (filesList.length > 0) {
            res.send(filesList);
        }
        else {
            res.send(null);
        }
    }
    else {
    res.send('해당 폴더가 존재하지 않습니다.');
    }
});

app.get('/banner/delete/:filename', (req, res) => {
    const folderPath = './banners'; // 특정 폴더 경로로 변경
    const filename = req.params.filename;
    const filePath = path.join(folderPath, filename);
  
    // 파일이 존재하는지 확인
    if (fs.existsSync(filePath)) {
      // 파일 삭제
      fs.unlinkSync(filePath);
      res.send(`File '${filename}' has been deleted.`);
    } else {
      res.status(404).send(`File '${filename}' not found.`);
    }
  });

app.listen(port, function() {
    console.clear();
    console.log(`========== PORT ${port} : 서버 시작 ==========`);
    console.log("*** 모든 요청 및 접속은 localhost 특성상 https 보안 접속을 지원하지 않습니다. ***")
    console.log(`-------------------------------------------`);
    console.log(`[GET] 위도 경도 확인 : http://localhost:7773/geolocation`);
    console.log(`-------------------------------------------`);
    console.log(`[GET] 급식 메뉴 요청 : http://localhost:7773/menu`);
    console.log(`[GET] 내일 날씨 요청 : http://localhost:7773/weather`);
    console.log(`-------------------------------------------`);
    console.log(`[GET] 설정 초기화 시도 : http://localhost:7773/setting/reset`);
    console.log(`[GET] 설정 초기화 승인 : http://localhost:7773/setting/reset?confirm=true`);
    console.log(`[GET] 설정 데이터 요청 : http://localhost:7773/setting/read`);
    console.log(`[POST] 설정 데이터 업데이트 : http://localhost:7773/setting/write`);
    console.log(`-------------------------------------------`);
    console.log("*** Developer : Giwon (2024) ***")
    console.log("*** Instagram : @giwon_w.dev7773 ***")
    console.log(`===========================================`);
});