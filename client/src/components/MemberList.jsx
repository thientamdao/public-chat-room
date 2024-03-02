import { Member } from './index'

const MemberList = ({ members = [] }) => (
  <ul>
    {members.map((member, index) => (
      <li key={index}>
        <Member member={member} />
      </li>
    ))}
  </ul>
)

export default MemberList
