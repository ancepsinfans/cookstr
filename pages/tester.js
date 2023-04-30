import React from "react";
import { useSubscribe } from "nostr-hooks";


export default function MyComponent() {
    const [toggle, setToggle] = React.useState(false);

    const { events, eose } = useSubscribe({
        relays: ['wss://relay.damus.io'],
        filters: [{ authors: ['9f869a838d650d83'], kinds: [6], limit: 10 }],
        options: {
            enabled: toggle,
            force: false,
            batchingInterval: 500,
        },
    });

    if (!events && !eose) return <p>Loading...</p>;

    return (
        <>
            <button onClick={() => setToggle(!toggle)}>Toggle</button>

            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <p>{event.pubkey}</p>
                        <p>{event.kind}</p>
                        <p>{event.content}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};