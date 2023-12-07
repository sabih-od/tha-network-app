import {
    Pusher,
    PusherMember,
    PusherChannel,
    PusherEvent,
} from '@pusher/pusher-websocket-react-native';

const pusher = Pusher.getInstance();

export async function connectPusher() {


    try {
        await pusher.init({
            apiKey: '49dc2575980eb51650f5',
            cluster: 'ap2',
            // authEndpoint: '<YOUR ENDPOINT URI>',
            // onConnectionStateChange,
            // onError,
            onEvent,
            // onSubscriptionSucceeded,
            // onSubscriptionError,
            // onDecryptionFailure,
            // onMemberAdded,
            // onMemberRemoved,
            // onSubscriptionCount,
        });
        await pusher.connect();
        // await pusher.subscribe({ channelName });

        let myChannel = await pusher.subscribe({
            channelName: "my-channel",
            // onEvent: (event) => {
            //     console.log('onEvent => ', event);
            // }
        });

    } catch (e) {
        console.log(`ERROR: ${e}`);
    }
}

function onEvent(event) {
    console.log("onEvent: $event => ", event);
}

export function getPusher() {
    return pusher;
}