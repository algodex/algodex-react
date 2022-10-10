/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

#!/usr/bin/env node

/* eslint-disable */

/**
 * Command to Translate missing locales on updates
 * @example
 * # Output the changes to the console
 * node bin/translate.js
 * # Write the changes to file
 * node bin/translate.js true
 */

// TODO: Move to @algodex/cli
const fs = require('fs');
const path = require('path');
const translate = require('translate');

// Should Write Files (override as first parameter or second if supplied with a path)
let shouldWrite = false;
// Path to locales (override with first parameter)
let localesPath = path.resolve('locales');

// Available Languages
// TODO: Dynamically find folders
const langs = ['en', 'es', 'hu', 'nl', 'tr', 'vn', 'ch'];

// First argument can be true(for writing to file) or a path(for loading and printing)
if(typeof process.argv[2] !== 'undefined'){
    if(process.argv[2] === 'true'){
        shouldWrite = true;
    } else {
        const argPath = path.resolve(process.argv[2]);
        if(fs.existsSync(argPath)){
            localesPath = argPath;
        } else {
            throw new Error(`Could not find ${process.argv[2]}`)
        }
    }
}

// If the first argument is a path, the second argument can be boolean
if(typeof process.argv[3] !== 'undefined' && process.argv[3] === 'true') {
    shouldWrite = true;
}

/**
 * Side Loader. Adds empty object
 * @param {Object} prev Collector
 * @param {string} file File name
 * @param {string} lang Target Language
 * @returns {Object} Reduced Dictionary of Language Data, keyed by Language Directory
 */
function sideLoad(prev, file, lang){
    if(typeof prev[file] === 'undefined'){
        prev[file] = fs.existsSync(`${localesPath}${path.sep}${lang}${path.sep}${file}.json`) ?
            require(`${localesPath}${path.sep}${lang}${path.sep}${file}.json`) : {}
    }
    return prev;
}


/**
 * Map Lang Keys to Google Translate
 *
 * @see https://cloud.google.com/translate/docs/languages
 * @param {string} code
 * @returns {string} The ISO-639-1 Code
 */
function toISO639(code){
    const map = {
        ch: 'zh',
        vn: 'vi',
    }
    return typeof map[code] !== 'undefined' ? map[code] : code
}

/**
 * Flush to Languages Disk
 * @param {object} langDict Dictionary of translations keyed by language code
 */
function writeLangs(langDict){
    for(const lang of Object.keys(langDict)){
        for(const file of Object.keys(langDict[lang])){
            fs.writeFileSync(path.join(localesPath, lang, `${file}.json`), JSON.stringify(langDict[lang][file], null, 2))
        }
    }
}

// 😡 Can't wait for top level await native smh
( async ()=>{
    // Get EN files array (checks for new .json files)
    const files = fs.readdirSync(path.join(localesPath, 'en'))
        .map((file)=>file.replace('.json', ''))

    // Side load all languages
    const langDict = langs.reduce((res, lang)=>{
        if(typeof res[lang] === 'undefined'){
            res[lang] = files.reduce((prev, file)=>{
                return sideLoad(prev, file, lang)
            },{})
        }
        return res;
    },{})

    // Pull out english
    const en = langDict.en;
    delete langDict.en;

    // For each language, compare it to the english version and merge missing keys
    for(const lang of Object.keys(langDict)){
        for(const file of Object.keys(en)){
            // Get the translation and english parts
            const foreign = langDict[lang][file];
            const domestic = en[file];

            // Update missing keys
            for (const key of Object.keys(domestic)) {
                if(typeof foreign[key] === 'undefined'){
                    langDict[lang][file][key] = await translate(domestic[key], toISO639(lang))
                }
            }
        }
    }

    console.log(langDict);

    if(shouldWrite){
        writeLangs(langDict);
    }
})();
