import crypto from 'crypto'

export default function handler(req, res) {
    const { secret, iv, encryptedPrivateKey } = req.query

    // Generate a 32-byte key using PBKDF2
    const key = crypto.pbkdf2Sync(secret, 'NovemberOscarSierraTangoRomeo', 100000, 32, 'sha256')

    // // The initialization vector and ciphertext to be decrypted
    const ivd = Buffer.from(iv, 'hex')

    // Create a decipher object using AES-256 encryption
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, ivd)

    // Decrypt the ciphertext and get the original plaintext
    let decrypted = decipher.update(encryptedPrivateKey, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    // Print the original plaintext
    res.status(200).json({ privateKey: decrypted })
}
