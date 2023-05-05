import { useSubscribe } from "nostr-hooks";


export function getLikes(id, publicKey, relays = []) {
    const { events, eose } = useSubscribe({
        relays: [
            'ws://localhost:8182',
            'wss://relay.damus.io',
            'wss://relay.snort.social',
            'wss://eden.nostr.land',
            'wss://relay.nostr.info',
            'wss://offchain.pub',
            'wss://nostr-pub.wellorder.net',
            'wss://nostr.fmt.wiz.biz',
            'wss://nos.lol',
            ...relays
        ], filters: [{ kinds: [7], '#e': [id] }],
    });
    const newEvents = events.reduce((accumulator, currentObject) => {
        if (!accumulator.some(({ pubkey }) => pubkey === currentObject.pubkey)) {
            accumulator.push(currentObject);
        }
        return accumulator;
    }, []);

    let isLikedByUser

    if (publicKey !== '') {
        isLikedByUser = newEvents.some(obj => obj.pubkey === publicKey);
    }

    return { likes: newEvents.length, isLikedByUser, eose }
}

