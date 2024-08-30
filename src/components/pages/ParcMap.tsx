import map from '../../assets/img/desktop/Rectangle-9-_1_.webp';

function ParcMap() {
  return (
    <div className="m-40">
      <h2 className="uppercase text-5xl text-white mb-8">
        Plan<span className="text-redZombie"> du parc</span>
      </h2>
      <img className="" src={map} alt="Plan des attractions de ZombieLand" />
    </div>
  );
}

export default ParcMap;
