import React, { useCallback, useMemo } from 'react';
import { FillModes } from '../../IntervalChart';
import API from '../../../../../services/API';
import SimpleLineChart from '../../../../Chart/SimpleLineChart';
import { useAPICall, useFilledStats } from '../../../../../services/hooks';
import BasicChart from '../../BasicChart';

const STAT_NAME = 'Songs listened';

function SongsPer({
  className,
  start,
  end,
  timeSplit,
}) {
  const [rawStats, status] = useAPICall(API.songsPer, [start, end, timeSplit]);

  const dataGetter = useCallback(st => {
    if (st === null) return 0;
    return st.count;
  }, []);

  const stats = useFilledStats(rawStats, start, end, timeSplit, dataGetter, FillModes.ASK);

  const chartData = useMemo(() => stats?.map((stat, k) => ({ x: k, y: stat.data, date: stat._id })) || [], [stats]);

  return (
    <BasicChart
      name={STAT_NAME}
      stats={stats}
      status={status}
      className={className}
    >
      <SimpleLineChart
        xName="Date"
        yName="Songs listened"
        start={start}
        end={end}
        tValueFormat={value => `${value} tracks`}
        data={chartData}
      />
    </BasicChart>
  );
}

export default SongsPer;
