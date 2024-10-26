import {useState} from "react";
import styled from "@emotion/styled";

const Card = styled.div`
    width: 12rem;
    align-content: center;
    text-align: center;
    border: 3px solid #874949;
    border-radius: 10px;
    padding: 0 1.4rem;
    & > .buttonWrap{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.4rem;
        margin-bottom: 1.5rem;
    }
`;

const Button = styled.button`
    background-color: #874949;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    &:hover{
        background-color: #6d3737;
    }
`;

const CardComponent = ({name, englishName, github}) => {
  const [likeCount, setLikeCount] = useState(0);
  const onClick = () => {
    setLikeCount(likeCount + 1);
  }
  return <Card>
    <h2> {name}</h2>
    <div >{englishName}</div>
    <div>{github}</div>
    <div className="buttonWrap"> {likeCount}
      <Button onClick={onClick}>좋아요</Button>
    </div>
  </Card>;
}

export default CardComponent;
