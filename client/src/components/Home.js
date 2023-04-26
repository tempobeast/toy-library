function Home() {
  return (
    <div id="home" className="content">
      <h2>Welcome to the Library of Toys!</h2>
      <p>
        View our selection of engaging toys. When you find one you like selected it and we'll send it to you for free. Keep things fresh for your kids while managing your home clutter. Let's limit our plastic waste and encourage a circular economy for our toys.  
      </p>
      <div className="home__how-to-container">
        <div className="home__how-to-data">
          <img src="HowToCards-01.png" alt="choose toys" className="home__how-to-image"/>
          <h3>Choose Your Toys</h3>
        </div>
        <div className="home__how-to-data">
          <img src="HowToCards-02.png" alt="open the box and play" className="home__how-to-image"/>
          <h3>Open the Box and Play</h3>
        </div>
        <div className="home__how-to-data">
          <img src="HowToCards-03.png" alt="Return the toy with provided postage" className="home__how-to-image"/>
          <h3>Return the Toy with Provided Postage</h3>
        </div>
      </div>
    </div>
  );
}
export default Home;
