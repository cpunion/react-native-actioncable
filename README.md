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

## Use ActionCableProvider

In outer container:

```jsx
import { ActionCableProvider } from 'react-native-actioncable'

export default function Container (props) {
    return (
        <ActionCableProvider url='ws://localhost:3000/cable'>
            <MyApp />
        </ActionCableProvider>
    )
}
```

In some UI screen:

```jsx
import React, { Component, PropTypes } from 'react'
import ActionCable from 'react-native-actioncable'

export default class ChatRoom extends Component {
    static contextTypes = {
        cable: PropTypes.object.isRequired
    };

    componentDidMount () {
        this.subscription = this.context.cable.subscriptions.create(
            'ChatChannel',
            {
                received (date) {
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
