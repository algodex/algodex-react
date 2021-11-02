/**
 * Orders Map
 * @param {object} doc
 */
export default function(doc) {
  // Source: http://code.google.com/p/gflot/source/browse/trunk/flot/base64.js?r=153
  // Cached-Source: https://gist.github.com/AndreasMadsen/2693051

  /* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
   * Version: 1.0
   * LastModified: Dec 25 1999
   * This library is free.  You can redistribute it and/or modify it.
   */
  const atob = function(target) {
    const base64DecodeChars = [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
      52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
      -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
      -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1,
    ];

    /**
     * @param {string} str
     * @return {string}
     */
    function base64decode(str) {
      let c1; let c2; let c3; let c4;
      let i; let out;

      const len = str.length;
      i = 0;
      out = '';
      while (i < len) {
        /* c1 */
        do {
          c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 === -1);
        if (c1 === -1) {
          break;
        }

        /* c2 */
        do {
          c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 === -1);
        if (c2 === -1) {
          break;
        }

        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        /* c3 */
        do {
          c3 = str.charCodeAt(i++) & 0xff;
          if (c3 === 61) {
            return out;
          }
          c3 = base64DecodeChars[c3];
        } while (i < len && c3 === -1);
        if (c3 === -1) {
          break;
        }

        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        /* c4 */
        do {
          c4 = str.charCodeAt(i++) & 0xff;
          if (c4 === 61) {
            return out;
          }
          c4 = base64DecodeChars[c4];
        } while (i < len && c4 === -1);
        if (c4 === -1) {
          break;
        }
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
      }
      return out;
    }

    return base64decode(target);
  };


  // Map Function
  if (typeof doc.txns !== 'undefined') {
    doc.txns.forEach((txn) => {
      // if(txn.txn.rcv && txn.txn.snd) {
      //   emit(txn.txn.rcv, [txn.txn.amt, txn.txn.fee])
      // }
      const date = new Date(doc.ts*1000);
      const month = date.getUTCMonth() + 1; // months from 1-12
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();
      const hour = date.getHours();
      const min = date.getMinutes();
      const sec = date.getSeconds();

      if (txn.txn && txn.txn.type) {
        const isAlgodex = ( txn.txn.apid === 22045503 ||
          txn.txn.apid === 22045522);
        if (txn.txn.type === 'appl' && isAlgodex) {
          if (typeof txn.txn.apaa !== 'undefined') {
            const orderInfo = atob(txn.txn.apaa[1]);
            const parts =orderInfo.split(/^(\d+)-(\d+)-(\d+)-(\d+)$/);
            const res = {
              apat: txn.txn.apat,
              type: atob(txn.txn.apaa[0]),
              orderInfo: txn.txn.apaa[1],
              numerator: parseInt(parts[1]),
              assetId: parseInt(parts[4]),
              denominator: parseInt(parts[2]),
              minimum: parseInt(parts[3]),
              price: parseFloat(parseInt(parts[2]))/parseInt(parts[1]),
              block: doc._id,
              ts: doc.ts,
            };

            emit([res.assetId, year, month, day, hour, min, sec], res);
          }
        }
      }
    });
  }
};
