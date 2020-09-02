import * as SQLite from 'expo-sqlite';

let db; 

export const createConnection = () => {
    db = SQLite.openDatabase("Timer.db");
    db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
    console.log('Foreign keys turned on')
);
}


export const createTables = () => {
    db.transaction(tx => {
        tx.executeSql(
          'create table if not exists Timers (timer_id integer primary key not null, timer_name text, timer_description text);'
          ,[], ( _,res) =>
          console.log(JSON.stringify(res))
        );
        tx.executeSql(
            'create table if not exists Time_Blocks (time_block_id integer primary key not null, time_block_title text, time_block_description text,time_block_sec bigint);'
            ,[], ( _,res) =>
            console.log(JSON.stringify(res))
          );

        tx.executeSql(
            'create table if not exists Timer_Time_Blocks (id integer primary key not null,timer_id int ,time_block_id int, position int,FOREIGN KEY(timer_id) REFERENCES Timers(timer_id) ON DELETE CASCADE,FOREIGN KEY(time_block_id) REFERENCES Time_Blocks(time_block_id) ON DELETE CASCADE);'

            ,[], ( _,res) =>
            console.log(JSON.stringify(res))
          );
      });
}

// add timeblock 
// input- title: title of the timeblock
// input- description: description of the timeblock
// input- sec: total of seconds this timeblock will run
export const addTimer = (timer_name,timer_description) => {
    // is text empty?
    if (timer_name === null || timer_name === "" || timer_description === null || timer_description=== ""  ) {
      return false;
    }

    db.transaction(
      tx => {
        tx.executeSql("insert into Timers (timer_name, timer_description) values (?, ?)", [timer_name,timer_description]);
        tx.executeSql("select * from Timers", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
    );
  }


// add timeblock 
// input- title: title of the timeblock
// input- description: description of the timeblock
// input- sec: total of seconds this timeblock will run
export const addTimeBlock = (title,description,sec) => {
    // is text empty?
    if (title === null || title === "" || description === null || sec=== null || sec < 1  ) {
      return false;
    }

    db.transaction(
      tx => {
        tx.executeSql("insert into Time_Blocks (time_block_title, time_block_description,time_block_sec) values (?, ?, ?)", [title,description,sec]);
        tx.executeSql("select * from Time_Blocks", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
    );
  }

// add timeblock 
// input- title: title of the timeblock
// input- description: description of the timeblock
// input- sec: total of seconds this timeblock will run
export const addTimeBlockToTimer = (timerID,timeBlockId,position) => {
    // is text empty?
    if (timerID === null  || timeBlockId === null || position < 0  ) {
      return false;
    }

    db.transaction(
      tx => {
        tx.executeSql(" insert into Timer_Time_Blocks (timer_id, time_block_id,position) values (?, ?, ?)", [timerID,timeBlockId,position], (_, { rows }) =>
        console.log("g"));
        tx.executeSql("select * from Timer_Time_Blocks", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
    );
  }


  // get all timeblocks of timer = id 
  // input- timerID: id of the timer
  // input- setTimerBlocks: setState function to populate result with
  export const getTimers = () => {
    console.log("getTimers")
db.transaction(tx => {
  tx.executeSql(
    `select * from Timers;`,
    [],
    (_, { rows }) => {
        console.log(rows)
      //   setTimerBlocks(_array)
      }
  );
});
}

// get all timeblocks of all timers
  export const getAllTimersTimeBlocks = () => {
    console.log("getAllTimersTimeBlocks")
db.transaction(tx => {
  tx.executeSql(
    `select * from Timer_Time_Blocks;`,
    [],
    (_, { rows }) => {
        console.log(rows)
      //   setTimerBlocks(_array)
      }
  );
});
}


  // get all timeblocks of timer = id 
  // input- timerID: id of the timer
  // input- setTimerBlocks: setState function to populate result with
  export const getTimer = (timerID,setTimerBlocks) => {
      console.log("getTimer")
  db.transaction(tx => {
    tx.executeSql(
      `select * from Timer_Time_Blocks left join Time_Blocks on Time_Blocks.time_block_id = Timer_Time_Blocks.time_block_id where timer_id = ? order by position;`,
      [timerID],
      (_, { rows:_array }) => {
          console.log(_array._array)
          setTimerBlocks(_array._array)
        }
    );
  });
}

// get all timeblocks of timer = id 
  // input- timerID: id of the timer
  // input- setTimerBlocks: setState function to populate result with
  export const getTime_Blocks = () => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from Time_Blocks;`,
        [],
        (_, { rows: { _array } }) => {
            console.log("getTime_Blocks")
            console.log(_array)
            // setTimerBlocks(_array)
        }
      );
    });
  }

// deletes a timeblock from a specific timer
// input- timeBlockId: timeblock id stays in Time_Blocks table
// input- timerID: id of the Timer in witch we delete the TimeBlock
// the timeblock id stays in Time_Blocks table
export const deleteTimeBlock = (timerID,timeBlockId,position) => {
    db.transaction(
        tx => {
          tx.executeSql(`delete from Timer_Time_Blocks where timer_id = ? and time_block_id = ? and position = ? ;`, [timerID,timeBlockId,position]);
        },
      )
  }

  // deletes a timeblock from a specific timer
// input- timeBlockId: timeblock id will delete from every timer

export const deleteTimeBlockInstnace = (timeBlockId) => {
    db.transaction(
        tx => {
          tx.executeSql(`delete from Time_Blocks where time_block_id = ? ;`, [timeBlockId]);
        },
      )
  }

  // deletes a Timer
// input- timerID: id of the Timer to delete

  export const deleteTimer = (timerID) => {
    db.transaction(
        tx => {
          tx.executeSql(`delete from Timers where timer_id = ? ;`, [timerID]);
        },
      )
  }
