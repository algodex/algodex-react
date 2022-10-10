import * as React from 'react'

const styles = {
  color: 'white'
}

interface IPerson {
  firstName: string
  lastName: string
  sayWorks: () => string
}

const customer: IPerson = {
  firstName: 'Tom',
  lastName: 'Hanks',
  sayWorks: (): string => {
    return 'Works'
  }
}

export default class Counter extends React.Component {
  state = {
    count: 0
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  decrement = () => {
    this.setState({
      count: this.state.count - 1
    })
  }

  render() {
    return (
      <div>
        <h1 style={styles}>
          {this.state.count} {customer.sayWorks()}
        </h1>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    )
  }
}
