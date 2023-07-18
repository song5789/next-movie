export default function about() {
  return (
    <div className="container">
      <div>제작자 : SONG</div>
      <div>Email : zken14@gamil.com</div>
      <style jsx>
        {`
          .container {
            min-width: 400px;
            max-width: 500px;
            display: flex;
            flex-direction: column;
            align-itmes: cetner;
            justify-content: center;
            font-size: 1.3rem;
            margin: 1rem auto;
            background: #fff;
            padding: 2rem;
            box-sizing: border-box;
            border-radius: 10px;
          }
        `}
      </style>
    </div>
  );
}
