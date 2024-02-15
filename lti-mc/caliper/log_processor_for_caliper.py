"""Generate CSV input file for generating video caliper statements."""
import sys

import pandas as pd


def main():
    """Main function."""
    df = pd.read_csv(
        sys.stdin
    )

    df = df.reset_index()
    df.sort_values('timestamp', inplace=True)

    # Convert 'play' and 'trackchange' events
    updated_row = []
    for query in df['query'].unique():
        filtered = df[df['query'] == query]
        started = False
        for i in range(len(filtered)):
            row = filtered.iloc[i]
            # Convert 'play' to 'started' or 'resumed'
            if row['eventname'] == 'play':
                df = df.drop(index=row['index'])
                if not started:
                    eventname = 'started'
                    started = True
                else:
                    eventname = 'resumed'
                updated_row.append({
                    'timestamp': row['timestamp'],
                    'eventname': eventname,
                    'eventdetail': row['eventdetail'],
                    'file': row['file'],
                    'query': row['query'],
                    'current': row['current'],
                    'referrer': row['referrer'],
                    'userid': row['userid'],
                    'courseid': row['courseid'],
                    'nonce': row['nonce'],
                    'videoplayerlog': row['videoplayerlog'],
                    'index': '',
                })
            # Convert 'trackchange' to 'enabled/disabled_closed_captioning'
            if row['eventname'] == 'trackchange':
                df = df.drop(index=row['index'])
                if row['eventdetail'] == 'off':
                    eventname = 'disabled-closed-captioning'
                else:
                    eventname = 'enabled-closed-captioning'
                updated_row.append({
                    'timestamp': row['timestamp'],
                    'eventname': eventname,
                    'eventdetail': row['eventdetail'],
                    'file': row['file'],
                    'query': row['query'],
                    'current': row['current'],
                    'referrer': row['referrer'],
                    'userid': row['userid'],
                    'courseid': row['courseid'],
                    'nonce': row['nonce'],
                    'videoplayerlog': row['videoplayerlog'],
                    'index': '',
                })
    df = pd.concat(
        [df, pd.DataFrame(updated_row)],
        sort=False
    ).sort_values('timestamp')
    df = df.drop('index', axis=1)
    df = df.drop('eventdetail', axis=1)

    df.to_csv('app/videojs.csv', index=False)


if __name__ == '__main__':
    main()
