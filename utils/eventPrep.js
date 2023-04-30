import {
    validateEvent,
    verifySignature,
    signEvent,
    getEventHash,
    getPublicKey,
    relayInit,
} from 'nostr-tools'


export function formAndSignEvent(privateKey, kind, content, tags = []) {

    let event = {
        kind,
        created_at: Math.floor(Date.now() / 1000),
        tags,
        content: (typeof content === 'string' ? content : JSON.stringify(content)),
        pubkey: getPublicKey(privateKey),
    }
    event.id = getEventHash(event)
    event.sig = signEvent(event, privateKey)

    let ok = validateEvent(event)
    let veryOk = verifySignature(event)
    console.log(ok, veryOk)
    if (!ok) {
        throw new Error(`Event is invalid:\n${event}`)
    } else if (!veryOk) {
        throw new Error(`Signature failed:\n${event}`)
    } else {
        return event
    }
}

export async function sendEventToRelay(event) {

    const relay = relayInit(
        'ws://localhost:8182'
        // 'wss://relay.damus.io'
    )
    relay.on('connect', () => {
        console.log(`connected to ${relay.url}`)
    })
    relay.on('error', () => {
        console.log(`failed to connect to ${relay.url}`)
    })

    await relay.connect()

    let pub = relay.publish(event)
    pub.on('ok', () => {
        console.log(`${relay.url} has accepted our event`)
    })
    pub.on('failed', reason => {
        console.log(`failed to publish to ${relay.url}: ${reason}`)
    })


    relay.close()
}
