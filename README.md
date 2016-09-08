ActionCable for react native.

Just import `actioncable` module, and let it compatiblely with `react native`.

# Install

```
npm install --save react-native-actioncable
```

# Usage

Two ways to use `react-native-actioncable`

## Use ActionCable methods

```jsx
import ActionCable from 'react-native-actioncable'

const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

// ... Other code
```

## Use with `react-actioncable-provider`

In outer container:

```jsx
import ActionCable from 'react-native-actioncable'
import ActionCableProvider from 'react-actioncable-provider'

const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

export default function Container (props) {
    return (
        <ActionCableProvider cable={cable}>
            <MyApp />
        </ActionCableProvider>
    )
}
```

In some UI screen:

```jsx
import React, { Component, PropTypes } from 'react'

export default class ChatRoom extends Component {
    static contextTypes = {
        cable: PropTypes.object.isRequired
    };

    componentDidMount () {
        this.subscription = this.context.cable.subscriptions.create(
            'ChatChannel',
            {
                received (data) {
                    console.log(data)
                }
            }
        )
    }

    componentWillUnmount () {
        this.subscription &&
            this.context.cable.subscriptions.remove(this.subscription)
    }

    // ... Other code
}
```
