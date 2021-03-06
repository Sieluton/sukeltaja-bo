import React, { useState } from 'react'
import { Collapse, Table } from 'react-bootstrap'
import Target from './Target'
import Dives from './Dives'
import { formatDate } from '../utils/dates'

const DivingEvent = (props) => {

  const [showEventDetails, setShowEventDetails] = useState(false)

  const divingEvent = props.divingEvent
  const gotDescription = (
    divingEvent.description !== undefined && divingEvent.description !== null && divingEvent.description !== ''
  )
  const gotTarget = divingEvent.target !== undefined && divingEvent.target !== null
  const gotDives = (
    divingEvent.dives !== undefined && divingEvent.dives !== null && divingEvent.dives.length > 0
  )

  const dives = () => {
    if (gotDives) {
      return (
        <Dives dives={divingEvent.dives} elementId={`divesOf${divingEvent}`} />
      )
    } else {
      return null
    }
  }

  const diveTarget = () => {
    if (gotTarget) {
      return (
        <>
          <tr id="target">
            <td width="2.5%"></td>
            <td width="40%" colSpan="2" id="caption">Kohde</td>
            <td width="57.5%" colSpan="4" id="caption">Sijainti</td>
          </tr>
          <Target target={divingEvent.target} elementId={divingEvent._id.concat(divingEvent.target._id)} />
        </>
      )
    } else {
      return null
    }
  }

  const eventDescription = () => {
    if (gotDescription) {
      return (
        <tr>
          <td colSpan="6" debug="description">{props.divingEvent.description}</td>
        </tr>
      )
    } else {
      return null
    }
  }

  const detailCaret = () => {
    if (gotDescription || gotTarget) {
      return <i className={showEventDetails ? 'fas fa-caret-down' : 'fas fa-caret-right'}></i>
    } else {
      return null
    }
  }

  const details = () => {
    if (gotDescription || gotTarget) {
      return (
        <Collapse in={showEventDetails}>
          <tr id={divingEvent._id}>
            <td colSpan="7">
              <Table>
                <tbody>
                  {eventDescription()}
                  {diveTarget()}
                  {dives()}
                </tbody>
              </Table>
            </td>
          </tr>
        </Collapse>
      )
    } else {
      return null
    }
  }

  if (props.noDetails) {
    return (
      <tr>
        <td>{formatDate(props.divingEvent.startdate)}</td><td>{props.divingEvent.title}</td>
      </tr>
    )
  } else {
    return (
      <>
        <tr onClick={() => setShowEventDetails(!showEventDetails)}
          aria-controls={divingEvent._id}
          aria-expanded={showEventDetails}>
          <td>{detailCaret()}</td>
          <td>{formatDate(props.divingEvent.startdate)}</td>
          <td>{formatDate(props.divingEvent.enddate)}</td>
          <td>{props.divingEvent.creator.username}</td>
          <td colSpan="3">{props.divingEvent.title}</td>
        </tr>
        {details()}
      </>
    )
    }


}

export default DivingEvent
