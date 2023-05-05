import { useSubscribe } from "nostr-hooks";


export function getBookmarks(publicKey, relays = []) {
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
        ], filters: [{ kinds: [30001], authors: [publicKey], '#d': 'Cookstr Bookmarks' }],
    });
    const newEvents = events.reduce((accumulator, currentObject) => {
        if (!accumulator.some(({ pubkey }) => pubkey === currentObject.pubkey)) {
            accumulator.push(currentObject);
        }
        return accumulator;
    }, []);

    // let isBookmarkedByUser

    // if (publicKey !== '') {
    //     isBookmarkedByUser = newEvents.some(obj => obj.pubkey === publicKey);
    // }

    return {
        bookmarks: newEvents,
        // isBookmarkedByUser,
        eose
    }
}

