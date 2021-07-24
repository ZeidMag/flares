import { useState, useEffect, Fragment } from 'react';
import FlareListItem from '../common/FlareListItem';
import './FlaresModal.css';

const FlaresModal = ({ flaresList, selectedFlares, setSelectedFlares }) => {
  const verifyAllFlaresChecked = (arr, target) =>
    target.every((v) => arr.includes(v));

  const [allSelected, setAllSelected] = useState(false);
  useEffect(() => {
    setAllSelected(
      verifyAllFlaresChecked(
        selectedFlares.map((selectedFlare) => selectedFlare.id.toString()),
        flaresList.map((flare) => flare.id.toString())
      )
    );
  }, [flaresList, selectedFlares]);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  const toggleCheck = (e) => {
    if (
      selectedFlares.some((flare) => flare.id.toString() === e.target.value)
    ) {
      return setSelectedFlares((prevState) =>
        prevState.filter((flare) => flare.id.toString() !== e.target.value)
      );
    }
    setSelectedFlares((prevState) => [
      ...prevState,
      flaresList.filter((flare) => flare.id.toString() === e.target.value)[0],
    ]);
  };

  const toggleAll = () => {
    const flareListIds = flaresList.map((flare) => flare.id.toString());
    const selectedFlaresListIds = selectedFlares.map((selectedFlare) =>
      selectedFlare.id.toString()
    );
    if (verifyAllFlaresChecked(selectedFlaresListIds, flareListIds)) {
      setAllSelected(false);
      return setSelectedFlares((prevState) =>
        prevState.filter(
          (selectedFlare) =>
            !flaresList.map((flare) => flare.id).includes(selectedFlare.id)
        )
      );
    }
    setAllSelected(true);
    const unselectedFlares = flaresList.filter(
      (flare) =>
        !selectedFlares
          .map((selectedFlare) => selectedFlare.id)
          .includes(flare.id)
    );

    setSelectedFlares((prevState) => [...prevState, ...unselectedFlares]);
  };
  // const tempConsole = () => {
  //   console.log('flaresList');
  //   console.log(flaresList);
  //   console.log('selectedFlares');
  //   console.log(selectedFlares);
  // };

  return (
    <div className="flares-modal" onClick={stopPropagation}>
      {/* <button onClick={tempConsole}>show flarelist and selected</button> */}
      <h1>hi from flares modal</h1>
      <label>select all</label>
      <input type="checkbox" onChange={toggleAll} checked={allSelected} />
      <ol>
        {flaresList.length
          ? flaresList.map((flare, i) => (
              <Fragment key={i}>
                <FlareListItem
                  flare={flare}
                  toggleCheck={toggleCheck}
                  selectedFlares={selectedFlares}
                >
                  <input
                    type="checkbox"
                    value={flare.id}
                    onChange={toggleCheck}
                    checked={selectedFlares.some(
                      (selectedFlare) =>
                        selectedFlare.id.toString() === flare.id.toString()
                    )}
                  />
                </FlareListItem>
              </Fragment>
            ))
          : null}
      </ol>
    </div>
  );
};

export default FlaresModal;
