import crypto from 'crypto'

export default function handler(req, res) {
    const { secret, pkey } = req.query

    // Generate a 32-byte key using PBKDF2
    const key = crypto.pbkdf2Sync(secret, 'NovemberOscarSierraTangoRomeo', 100000, 32, 'sha256')

    // Generate a random initialization vector
    const iv = crypto.randomBytes(16)

    // Create a cipher object using AES-256 encryption
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)

    // Encrypt the input string and get the ciphertext
    let encryptedPrivateKey = cipher.update(pkey, 'utf8', 'hex')
    encryptedPrivateKey += cipher.final('hex')

    // Return the initialization vector and ciphertext as a JSON response
    res.status(200).json({ iv: iv.toString('hex'), encryptedPrivateKey })
}
