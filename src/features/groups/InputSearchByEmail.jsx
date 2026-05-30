import { useState } from "react"
import { InputGroup, Form, Alert } from "react-bootstrap"
import { useDispatch } from "react-redux"
//import { findGroupByAdminEmail } from "../../services/groupApi"
import { sendGroupInvitation } from "../../redux/groupSlice"

function InputSearchByEmail({ onLoadingChange, placeholder, isInvite }) {
  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [error, setError] = useState("")
  const [inviteSuccess, setInviteSuccess] = useState(false)

  const dispatch = useDispatch()

  const handleGroupSearch = async (e) => {
    if (e) e.preventDefault()

    /* if (!searchEmail.trim()) {
      setError("Please enter a valid email address to search.")
      return
    } */

    onLoadingChange(true)
    setError("")

    try {
      //const res = await dispatch(findGroupByAdminEmail(searchEmail.trim())).unwrap()
      //console.log("Successfully found group details:", res)
      //      onResponse(res)
    } catch (err) {
      console.error("Search failed:", err)

      const fallbackMessage = "Could not find the email you searched."
      setError(err?.message || err || fallbackMessage)
    } finally {
      onLoadingChange(false)
    }
  }

  const handleInvitationSend = async (e) => {
    if (e) e.preventDefault()

    if (!recipientEmail.trim()) {
      setError("Please enter a valid email address to search.")
      return
    }
    onLoadingChange(true)
    setError("")

    try {
      const payload = {
        recipientEmail: recipientEmail.trim(),
        recipientName: recipientName.trim(),
      }
      const response = await dispatch(sendGroupInvitation(payload)).unwrap()
      console.log("Invitation was successfully sent", response)
      setRecipientEmail("")
      setRecipientName("")
      setInviteSuccess(true)
    } catch (err) {
      console.error("Sending invite failed:", err)
      const fallbackMessage = "Could not find send the message."
      setError(err?.message || err || fallbackMessage)
    } finally {
      onLoadingChange(false)
    }
  }
  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      {inviteSuccess && <Alert variant="success">An invitation was sent to the email</Alert>}
      <Form onSubmit={isInvite ? handleInvitationSend : handleGroupSearch}>
        <InputGroup>
          <Form.Control type="text" placeholder="Username" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
        </InputGroup>
        <InputGroup>
          <Form.Control type="email" placeholder={placeholder} value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} />
        </InputGroup>

        <button className="btn btn-danger" type="submit">
          Send invite
        </button>
      </Form>
    </>
  )
}

export default InputSearchByEmail
