import React from 'react'
import { Form, Progress } from 'semantic-ui-react'
import axios from 'axios'

class WatsonForm extends React.Component {

  constructor() {
    super()
    this.state = {
      inputText: '',
      submittedText: '',
      anger: 0,
      disgust: 0,
      fear: 0,
      joy: 0,
      sadness: 0
    }
    this.request = axios.create({
      baseURL: 'http://localhost:3001'
    })
  }

  analyzeText(data) {
    return this.request({method: 'Get', url: `/analyze?text=${data.text}`})
      .then(response => {
        console.log(response.data.tone.document_tone.tone_categories[0].tones)
        this.setState({
          anger: response.data.tone.document_tone.tone_categories[0].tones[0].score * 100,
          disgust: response.data.tone.document_tone.tone_categories[0].tones[1].score * 100,
          fear: response.data.tone.document_tone.tone_categories[0].tones[2].score * 100,
          joy: response.data.tone.document_tone.tone_categories[0].tones[3].score * 100,
          sadness: response.data.tone.document_tone.tone_categories[0].tones[4].score * 100
        })
      })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { inputText } = this.state
    this.setState({ submittedText: inputText })
    const formData = {
      text: this.state.inputText
    }
    this.analyzeText(formData)
  }

  render() {

    const { inputText, anger, disgust, fear, joy, sadness } = this.state

    return (
      <div>
        <Form className='text-form' onSubmit={this.handleSubmit.bind(this)}>
          <Form.TextArea placeholder='What do you want to analyze?' name='inputText' value={inputText} onChange={this.handleChange.bind(this)} />
          <Form.Button color='blue'>Analyze</Form.Button>
        </Form>
        <div className='progress-bars'>
          <h4>Anger</h4>
          <Progress active percent={anger} color='red' />
          <h4>Disgust</h4>
          <Progress active percent={disgust} color='olive' />
          <h4>Fear</h4>
          <Progress active percent={fear} color='yellow' />
          <h4>Joy</h4>
          <Progress active percent={joy} color='pink' />
          <h4>Sadness</h4>
          <Progress active percent={sadness} color='blue' />
        </div>
      </div>
    )
  }
}

export default WatsonForm