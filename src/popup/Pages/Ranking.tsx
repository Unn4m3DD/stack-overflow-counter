import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { getTodayTimestamp } from '../../background';
import { auth, db } from '../../firebase-config';
import { Friend } from '../../types';
import { DataGrid } from '@mui/x-data-grid';

import './styles.scss';
import { CircularProgress } from '@mui/material';

const Ranking: React.FC = () => {
  const [friendStats, setFriendStats] = React.useState<Friend[]>()
  useEffect(() => {
    const getNewFriendStats = async () => {
      if (!auth.currentUser) return
      let friendList: string[] = await (await getDoc(doc(db, "users", auth.currentUser.uid))).data().friends
      friendList.push(auth.currentUser.uid)
      friendList = Array.from(new Set(friendList))
      const newFriends: Friend[] = []
      for (let friendId of friendList)
        newFriends.push({ uid: friendId, ...(await getDoc(doc(db, "users", friendId))).data() } as Friend)
      newFriends.sort((a, b) => b.visits?.[getTodayTimestamp()] ?? 0 - a.visits?.[getTodayTimestamp()] ?? 0)
      setFriendStats(newFriends)
    }
    getNewFriendStats()
  }, [auth.currentUser])
  return <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
    {!friendStats && <CircularProgress />}
    {friendStats && <DataGrid
      rows={friendStats.map((e) => ({
        id: e.uid, ...e, visits: e.visits?.[getTodayTimestamp()] ?? 0
      }))}
      columns={
        [
          { field: 'image', headerName: 'Avatar', width: 70, renderCell: ({ value }) => <img src={value} style={{ height: "50px", width: "50px" }} /> },
          { field: 'name', headerName: 'Name', width: 160 },
          { field: 'visits', headerName: 'Visits', width: 70 },
        ]
      }
      getRowClassName={(params) => `${params.row.id === auth.currentUser.uid ? "selected" : ""}`}
      pageSize={10}
      rowsPerPageOptions={[10]}
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      disableDensitySelector
      disableSelectionOnClick
      hideFooter
    />}
  </div>;
}

export default Ranking;