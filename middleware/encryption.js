const crypto = require('crypto')
const path = require('path')
const fs = require('fs')
var config = require('config');

const publicKeyPath = "./Keys/public.pem"
const privateKeyPath = "./Keys/private.pem"

// Data encryption
 const encrypt =  (toEncrypt)  =>{
  try {
    const absolutePath = path.resolve(publicKeyPath)
    const publicKey = fs.readFileSync(absolutePath, 'utf8')
    const buffer = Buffer.from(toEncrypt, 'utf8')
    const encrypted = crypto.publicEncrypt(publicKey, buffer)
    return encrypted.toString('base64')
  } catch (error) {
    console.log("decryption failed for", toEncrypt);
    return toEncrypt;
  }
}


//Data Decryption
const decrypt =  (toDecrypt) => {
  try {
    const absolutePath = path.resolve(privateKeyPath)
    const privateKey = fs.readFileSync(absolutePath, 'utf8')
    const buffer = Buffer.from(toDecrypt, 'base64')
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey.toString(),
        passphrase: config.get('encryptionsecret'),
      },
      buffer,
    )
    return decrypted.toString('utf8')
  } catch (error) {
    return toDecrypt
  }
}

module.exports  = { encrypt, decrypt };
