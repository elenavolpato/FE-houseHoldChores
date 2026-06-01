import { updateAvatar } from "@/services/userApi"
import { useDispatch, useSelector } from "react-redux"
import { useRef } from "react"
import { Container, Spinner } from "react-bootstrap"

const ProfileAvatarChange = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.auth.loading)
  const inputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    dispatch(updateAvatar({ file }))
  }

  return (
    <Container className="d-flex flex-column align-items-center py-4">
      {/* Avatar circle */}
      <div className="position-relative mb-3" style={{ width: 150, height: 150 }}>
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt="avatar"
            className="rounded-circle border border-5 border-white shadow-sm"
            style={{ width: 150, height: 150, objectFit: "cover" }}
          />
        ) : (
          <div
            className="rounded-circle bg-secondary bg-opacity-10 border border-5 border-white d-flex align-items-center justify-content-center"
            style={{ width: 150, height: 150 }}
          >
            <i className="fa-solid fa-user fa-2x text-secondary" />
          </div>
        )}

        {/* Loading spinner overlay */}
        {loading && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 rounded-circle d-flex align-items-center justify-content-center"
            style={{ background: "rgba(255,255,255,0.7)" }}
          >
            <Spinner animation="border" size="sm" variant="primary" />
          </div>
        )}

        {/* Edit button */}
        <button
          className="position-absolute bottom-0 end-0 rounded-circle border-0 d-flex align-items-center justify-content-center"
          style={{
            width: 34,
            height: 34,
            background: "#185FA5",
            cursor: "pointer",
            outline: "2px solid white",
          }}
          onClick={() => inputRef.current.click()}
          title="Change avatar"
        >
          <i className="fa-solid fa-pencil" style={{ color: "white", fontSize: 13 }} />
        </button>

        <input ref={inputRef} type="file" accept="image/*" className="d-none" onChange={handleFileChange} />
      </div>

      {/* User info */}
      <p className="fw-semibold mb-0 text-dark">{user?.username || "Your Name"}</p>
      <p className="text-muted small">{user?.email || ""}</p>
    </Container>
  )
}

export default ProfileAvatarChange
