const SIMULATION = {
    POINT_TO_POINT_01: {
        NODES: [
            {
                "id": "0",
                "type": "portable",
                "data": {
                    "label": "default",
                    "rx": 155000000,
                    "tx": 150000000,
                    "status": "idle",
                    "type": {
                        "sql": "CSQ"
                    }
                },
                "position": {
                    "x": 258.33333333333337,
                    "y": 7.291666666666686
                },
                "style": {
                    "rotate": "90",
                    "borderRadius": "100%",
                    "backgroundColor": "#fff",
                    "width": 50,
                    "height": 50,
                    "display": "flex",
                    "alignItems": "center",
                    "justifyContent": "center"
                },
                "measured": {
                    "width": 50,
                    "height": 50
                },
                "selected": true,
                "dragging": false
            },
            {
                "id": "2",
                "type": "portable",
                "data": {
                    "label": "default",
                    "rx": 155000000,
                    "tx": 150000000,
                    "status": "idle",
                    "type": {
                        "sql": "CSQ"
                    }
                },
                "position": {
                    "x": -219.79166666666669,
                    "y": 27.083333333333314
                },
                "style": {
                    "rotate": "90",
                    "borderRadius": "100%",
                    "backgroundColor": "#fff",
                    "width": 50,
                    "height": 50,
                    "display": "flex",
                    "alignItems": "center",
                    "justifyContent": "center"
                },
                "measured": {
                    "width": 50,
                    "height": 50
                },
                "selected": false,
                "dragging": false
            },
            {
                "id": "3",
                "type": "repeater",
                "data": {
                    "label": "default",
                    "rx": 150000000,
                    "tx": 155000000,
                    "status": "idle",
                    "type": {
                        "sql": "CSQ"
                    }
                },
                "position": {
                    "x": -35.41666666666663,
                    "y": -171.22395833333334
                },
                "style": {
                    "rotate": "90",
                    "borderRadius": "100%",
                    "backgroundColor": "#fff",
                    "width": 50,
                    "height": 50,
                    "display": "flex",
                    "alignItems": "center",
                    "justifyContent": "center"
                },
                "measured": {
                    "width": 50,
                    "height": 50
                },
                "selected": false,
                "dragging": false
            }
        ],
        EDGES: [
                
        ]
    }
}
export type INode = typeof SIMULATION.POINT_TO_POINT_01.NODES
export { SIMULATION }