import React from 'react'
import Chair from '~/components/Chair/Chair'

const HomePage = () => {
  const value = ''
  return (
    <div>
      {/* <Chair /> */}
      <p dangerouslySetInnerHTML={{__html: value}}></p>
    </div>
  )
}

export default HomePage

