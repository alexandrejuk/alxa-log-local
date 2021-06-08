import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import LoginContainer from '../../Containers/Login'
import Auth from '../../Services/Auth'

const Login = ({
  history,
  loggedUser,
}) => {
  const [isVisibleMessageError, setIsVisibleMessageError] = useState(false)
  const [loading, setLoading] = useState(false)

  const authentication = (values) => {
    const { document } = values

    let redirectPage = '/logged/implement/manager'
    setLoading(true)
    Auth({...values, document: document.replace(/\D/g, '') })
      .then(({ data }) => {
        loggedUser(data)
        if (data.firstAccess) {
          redirectPage = '/user/onboarding'
        }
        localStorage.setItem('token', data.token)
        localStorage.setItem('user.name', data.name)
        return data
      })
      .then(() => history.push(redirectPage))
      .catch((err) => {
        setLoading(false)
        setIsVisibleMessageError(!!err.response)
        console.error(err)
      })
  }

  return (
    <LoginContainer
      authentication={authentication}
      isVisibleMessageError={isVisibleMessageError}
      loading={loading}
      registerPath="register"
    />
  )
}

const mapDispatchToProps = (dispatch) => ({
  loggedUser: (payload) => dispatch({ type: 'USER_LOGGED', payload }),
  setCompany: (payload) => dispatch({ type: 'SET_COMPANY', payload }),
  setStatus: (payload) => dispatch({ type: 'SET_STATUS', payload }),
  setSubscription: (payload) => dispatch({ type: 'SET_SUBSCRIPTION', payload })
})

const enhanced = compose(connect(null, mapDispatchToProps), withRouter)

export default enhanced(Login)
