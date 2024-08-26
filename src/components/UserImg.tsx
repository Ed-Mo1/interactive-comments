
const UserImg = ({img}:{img:string}) => {
  return (
    <img className="object-contain flex-shrink-0 w-[40px] aspect-square" src={img} alt="user_profile" />
  )
}

export default UserImg