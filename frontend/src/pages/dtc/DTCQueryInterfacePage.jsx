import React from 'react'
import DTCQueryInterface from '../../components/dtc/DTCQueryInterface'
import MessageContainer from '../../components/messages/MessageContainer'
const DTCQueryInterfacePage = () => {
  return (
    <>
    <div>
    <div className="flex justify-center items-center h-[10vh] font-bold text-3xl text-white">
        <h1>DTC Query Interface</h1>
        </div>
      <DTCQueryInterface/>
      <MessageContainer/>
    </div>
    </>
  )
}

export default DTCQueryInterfacePage
