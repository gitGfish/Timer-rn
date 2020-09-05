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
    console.log('addTimer')
    if (timer_name === null || timer_name === "" || timer_description === null || timer_description=== ""  ) {
      console.log("somethinf went wrong adding timer ")
      return false;
    }

    db.transaction(
      tx => {
        tx.executeSql("insert into Timers (timer_name, timer_description) values (?, ?)", [timer_name,timer_description]);
        tx.executeSql("select * from Timers", [], (_, { rows }) =>{console.log(rows)
        }
        );
      },
    );
  }


// add timeblock 
// input- title: title of the timeblock
// input- description: description of the timeblock
// input- sec: total of seconds this timeblock will run
// input- timerID: id of timer to add timeblock to
// input- position: in witch position to add
// output- id of inserted timeNlock
export const addTimeBlock = async (title,description,sec,timerID,position) => {
    // is text empty?
    if (title === null || title === "" || description === null || sec=== null || sec < 1 || timerID === null  || position < 0 ) {
      return false;
    }
    
    let lastInsertId =null
    db.transaction(
      tx => {
        tx.executeSql("insert into Time_Blocks (time_block_title, time_block_description,time_block_sec) values (?, ?, ?)", [title,description,sec],function(tx, sql_res) {
            lastInsertId = sql_res.insertId;
          });
        tx.executeSql("select * from Time_Blocks", [], (_, { rows }) =>{
        }
        );
      },
    );

    let new_position = position;
    // if some trying to add block in position 8 but there only 3 in that timer
    // the time block will be added to position 4
    db.transaction(
        tx => {
          tx.executeSql("select * from Timer_Time_Blocks WHERE timer_id = ? ", [timerID], (_, { rows : _array }) =>{
            if(new_position >= _array.length){
                new_position = _array.length
            }
          }
          );
        },
    );
    db.transaction(
      tx => {
        tx.executeSql(" UPDATE Timer_Time_Blocks SET position = position + 1 WHERE timer_id = ? and position >= ?", [timerID,new_position]);
        tx.executeSql(" insert into Timer_Time_Blocks (timer_id, time_block_id,position) values (?, ?, ?)", [timerID,lastInsertId,new_position],function(tx, sql_res) {
            lastInsertId = sql_res.insertId;
          });
        tx.executeSql("select * from Timer_Time_Blocks", [], (_, { rows }) =>{
        }
        );
      },
    );

    return lastInsertId
  }

// add timeblock 
// // input- title: title of the timeblock
// // input- description: description of the timeblock
// // input- sec: total of seconds this timeblock will run
// // output- id of inserted timeNlock
// export const addTimeBlockToTimer = (timerID,timeBlockId,position) => {
//     // is text empty?
//     if (timerID === null  || timeBlockId === null || position < 0  ) {
//       return false;
//     }
//     let new_position = position;
//     // // if some trying to add block in position 8 but there only 3 in that timer
//     // // the time block will be added to position 4
//     // db.transaction(
//     //     tx => {
//     //       tx.executeSql("select * from Timer_Time_Blocks WHERE timer_id = ? and position < ?", [timerID,position], (_, { rows : _array }) =>{
          
//     //       console.log(_array)
//     //       console.log("whaaaaattttt")
//     //       }
//     //       );
//     //     },
//     // );
//     db.transaction(
//       tx => {
//         tx.executeSql(" UPDATE Timer_Time_Blocks SET position = position + 1 WHERE timer_id = ? and position >= ?", [timerID,new_position]);
//         tx.executeSql(" insert into Timer_Time_Blocks (timer_id, time_block_id,position) values (?, ?, ?)", [timerID,timeBlockId,new_position],function(tx, sql_res) {
//             console.log(sql_res)
//             lastInsertId = sql_res.insertId;
//           });
//         tx.executeSql("select * from Timer_Time_Blocks", [], (_, { rows }) =>
//           console.log(JSON.stringify(rows))
//         );
//       },
//     );

//     return lastInsertId
//   }


  // get all timeblocks of timer = id 
  // input- timerID: id of the timer
  // input- setTimerBlocks: setState function to populate result with
  export const getTimers = async (setTimerBlocks) => {
    console.log("getTimers")
db.transaction(tx => {
  tx.executeSql(
    `select * from Timers;`,
    [],
    (_, { rows:_array }) => {
        setTimerBlocks(_array._array)
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
// input- timerID: id of the Timer in witch we delete the TimeBlock
// the timeblock id stays in Time_Blocks table
// input- position: what position to delete
export const deleteTimeBlock = (timerID,position) => {
    if (timerID === null  || position < 0  ) {
        return false;
      }
      // if some trying to delete block in position 8 but there only 3 in that timer
        // the time block will be deleted from  position 3
      let new_position = position;
      db.transaction(
        tx => {
          tx.executeSql("select * from Timer_Time_Blocks WHERE timer_id = ? ", [timerID], (_, { rows : _array }) =>{
              if(new_position >= _array.length){
                new_position = _array.length - 1
              }
              console.log("this is the new position" + new_position)
          }
          
          );
        },
    );
    db.transaction(

        tx => {
            tx.executeSql(`delete from Timer_Time_Blocks where timer_id = ?  and position = ? ;`, [timerID,new_position]);
            tx.executeSql(" UPDATE Timer_Time_Blocks SET position = position - 1 WHERE timer_id = ? and position > ?", [timerID,new_position]);
            
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
