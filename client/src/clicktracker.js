const axios = require('axios');

const clicktracker = (clickElementId, widget, time) => {

  let clickedObject = {
    element: clickElementId,
    widget: widget,
    time: time
  }

  axios.default.post('http://localhost:3000/tracking', clickedObject).then(() => {
    console.log('succesfully sent', clickedObject)
  }).catch((err) => {
    console.log('err in tracking post', err)
  })
}

export default clicktracker