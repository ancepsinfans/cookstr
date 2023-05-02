import { useSubscribe } from "nostr-hooks";


export function getRecipes(filters = {}, relays = []) {
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
        ], filters: [{ kinds: [99], ...filters }],
    });
    const newEvents = events.reduce((accumulator, currentObject) => {
        if (!accumulator.some(({ content }) => content === currentObject.content)) {
            accumulator.push(currentObject);
        }
        return accumulator;
    }, []);
    const recipes = newEvents.map(obj => {
        const { content, ...rest } = obj;
        return { ...rest, content: JSON.parse(content) };
    });

    return { recipes, eose }
} 