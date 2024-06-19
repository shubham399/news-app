const NEWS_TYPE = [
    "crypto"
    , "economy"
    , "et_markets"
    , "ga_dimension"
    , "india"
    , "mediawire"
    , "mediawire_widget"
    , "mf"
    , "newsletter"
    , "nri"
    , "politics"
    , "rise"
    , "tech"
    , "top_news"
    , "videoshow"
    , "webstories"
]

const data = require("./test.json");
const fs = require("fs");
const result = [];
for (const item of data) {
    if (NEWS_TYPE.includes(item.name)) {
        result.push(item);
    }
}

fs.writeFileSync("./output.json", JSON.stringify(result, null, 2));
