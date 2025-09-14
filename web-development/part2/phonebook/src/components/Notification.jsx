import React from 'react'

export const Notification = ({ currentContact, actionType }) => {

  const styleContainerByAction = !(actionType === 'ACTION_ERROR' || actionType === 'ACTION_ERROR_DELETE')? 'notification-container-success' : 'notification-container-error'

  if (actionType === 'ACTION_ADD') {
    return (
      <div className={styleContainerByAction}>
        <div>{`Added ${currentContact}`}</div>
      </div>

    )
  }
  if (actionType === 'ACTION_UPDATE') {
    return (
      <div className={styleContainerByAction}>
        <div>{`Updated ${currentContact}`}</div>
      </div>
    )
  }
  if (actionType === 'ACTION_ERROR') {
    return (
      <div className={styleContainerByAction}>
        <div>{`Information of ${currentContact} has already been removed from server`}</div>
      </div>
    )
  }
  if (actionType === 'ACTION_ERROR_DELETE') {
    return (
      <div className={styleContainerByAction}>
        <div>{`Contact has already been removed from server`}</div>
      </div>
    )
  }
  if (actionType === 'ACTION_SUCCESS_DELETE') {
    return (
      <div className={styleContainerByAction}>
        <div>{`Contact has been deleted`}</div>
      </div>
    )
  }
}
