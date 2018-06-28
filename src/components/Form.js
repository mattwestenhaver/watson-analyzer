import React from 'react'
import { Form } from 'semantic-ui-react'

class WatsonForm extends React.Component {

  constructor() {
    super()
    this.state = {
      inputText: '',
      submittedText: ''
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { inputText } = this.state
    this.setState({ submittedText: inputText })
    const formData = {
      text: this.state.inputText
    }
    console.log(formData)
  }

  render() {

    const { inputText } = this.state

    return (
      <Form className='text-form' onSubmit={this.handleSubmit.bind(this)}>
        <Form.TextArea placeholder='What do you want to analyze?' name='inputText' value={inputText} onChange={this.handleChange.bind(this)} />
        <Form.Button>Analyze</Form.Button>
      </Form>
    )
  }
}

export default WatsonForm