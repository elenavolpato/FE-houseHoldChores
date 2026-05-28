import { Dropdown } from "react-bootstrap"

function GroupHeader({ groups, selectedGroup, onSelectGroup }) {
  if (!selectedGroup) return null

  return (
    <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
      <div className="d-flex align-items-center">
        <Dropdown onSelect={(index) => onSelectGroup(groups[index])}>
          <Dropdown.Toggle
            variant="link"
            className="text-decoration-none p-0 fw-bold fs-3 text-dark d-flex align-items-center gap-2 border-0 dropdown-toggle-clean"
            style={{ boxShadow: "none" }}
          >
            {selectedGroup.groupName}
          </Dropdown.Toggle>

          <Dropdown.Menu className="border-0 shadow-sm rounded-4 p-2 mt-2">
            {groups.map((group, index) => (
              <Dropdown.Item
                key={group.id}
                eventKey={index}
                className={`rounded-3 py-2 px-3 small ${selectedGroup.id === group.id ? "bg-light text-dark fw-bold" : "text-secondary"}`}
              >
                {group.groupName}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      te{" "}
    </div>
  )
}

export default GroupHeader
