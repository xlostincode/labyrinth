import type { CellData } from "~/types/visualizer"

export const OFFSETS_SIMPLE = [
    [-1, 0], // Up
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Right
]

export const OFFSETS_DIAGONAL = [
    [-1, 0], // Up
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Right

    [-1, -1], // Up Left
    [-1, 1], // Up Right
    [1, -1], // Down Left
    [1, 1], // Down Right
]

export const TEST_MAZE_START_AND_FINISH = [
    [0, 0],
    [9, 9],
] as [number, number][]

export const MAZE_WITH_BLOCKED_FINISH = [
    [
        {
            id: "Cx0J_ww2qEnUEt8_",
            state: "start",
            weight: 0,
        },
        {
            id: "sSBX0dkqO4jBT_nd",
            state: "empty",
            weight: 4,
        },
        {
            id: "G6_KRvqoXuhhNoz7",
            state: "empty",
            weight: 0,
        },
        {
            id: "mRI_JTbI6X9a2fgP",
            state: "empty",
            weight: 1,
        },
        {
            id: "VG0ua_Gu_wwP6kiG",
            state: "empty",
            weight: 4,
        },
        {
            id: "-G5Ir2KDaFe81n1P",
            state: "empty",
            weight: 3,
        },
        {
            id: "Vsje-tqjOBzT4GDW",
            state: "empty",
            weight: 4,
        },
        {
            id: "fjP8QL8YXyh3hLdS",
            state: "empty",
            weight: 9,
        },
        {
            id: "KbBfOB9PO5JdRj0g",
            state: "empty",
            weight: 6,
        },
        {
            id: "0DhK3lDM-zRD3xAZ",
            state: "empty",
            weight: 7,
        },
    ],
    [
        {
            id: "qO17nXi6psSq0Uzg",
            state: "empty",
            weight: 8,
        },
        {
            id: "KUI3dD3ZojJQTjXs",
            state: "empty",
            weight: 6,
        },
        {
            id: "2n7_EiCSI1v1ZqXf",
            state: "empty",
            weight: 7,
        },
        {
            id: "VM87wuQ-sHxWBFij",
            state: "empty",
            weight: 2,
        },
        {
            id: "UpSej4svyL0k2BZj",
            state: "empty",
            weight: 8,
        },
        {
            id: "asq49givqc2oQ-fD",
            state: "empty",
            weight: 8,
        },
        {
            id: "83KzrNaTb7hDXiIw",
            state: "empty",
            weight: 2,
        },
        {
            id: "SVYgkypPc0HRlq0w",
            state: "empty",
            weight: 3,
        },
        {
            id: "a3osArDgHGcOfYax",
            state: "empty",
            weight: 3,
        },
        {
            id: "fAhZDtjSrsxKm87L",
            state: "empty",
            weight: 7,
        },
    ],
    [
        {
            id: "DzntMXWkQsX4M4ym",
            state: "empty",
            weight: 5,
        },
        {
            id: "PEkNg_irdCDsVkmc",
            state: "empty",
            weight: 8,
        },
        {
            id: "Fn4KV7NL66yqsmyf",
            state: "empty",
            weight: 0,
        },
        {
            id: "Uhpx6evWkuzeX5MZ",
            state: "empty",
            weight: 1,
        },
        {
            id: "t6Xxn_pMwsZI_vdD",
            state: "empty",
            weight: 8,
        },
        {
            id: "6Qekkb4_0PhiwgXz",
            state: "empty",
            weight: 4,
        },
        {
            id: "6DzsdSqFlfYrh0K8",
            state: "empty",
            weight: 9,
        },
        {
            id: "2JFDOZPa2srIZOIF",
            state: "empty",
            weight: 3,
        },
        {
            id: "Ias89gBZCZmNjDf_",
            state: "empty",
            weight: 0,
        },
        {
            id: "EwYt16ODgtpJQgc9",
            state: "empty",
            weight: 5,
        },
    ],
    [
        {
            id: "CSCITUuLyCXCR4_j",
            state: "empty",
            weight: 7,
        },
        {
            id: "z_opDVByH7nl53zs",
            state: "empty",
            weight: 6,
        },
        {
            id: "RKB6dIThFKNiV0PJ",
            state: "empty",
            weight: 0,
        },
        {
            id: "4EsvQfjGijSjkWbI",
            state: "empty",
            weight: 2,
        },
        {
            id: "ixxVlIc0e2G60Nv_",
            state: "empty",
            weight: 3,
        },
        {
            id: "fQkfSappFNBlJLQx",
            state: "empty",
            weight: 2,
        },
        {
            id: "xk6YOxG1DQ0BKvga",
            state: "empty",
            weight: 1,
        },
        {
            id: "SUIZ4dDWA16EhZS5",
            state: "empty",
            weight: 8,
        },
        {
            id: "L4VNEZa0cWwrKy6Q",
            state: "empty",
            weight: 5,
        },
        {
            id: "R4skE8_T07DugHMo",
            state: "empty",
            weight: 3,
        },
    ],
    [
        {
            id: "jCAisyPr1FPclBVP",
            state: "empty",
            weight: 8,
        },
        {
            id: "iHQFRpet2L3KD0nH",
            state: "empty",
            weight: 0,
        },
        {
            id: "HxzVDFgj0SPIaXfv",
            state: "empty",
            weight: 8,
        },
        {
            id: "1zar0cduYm7F9E-G",
            state: "empty",
            weight: 1,
        },
        {
            id: "rrDMppRs35osLCR3",
            state: "block",
            weight: 1,
        },
        {
            id: "LgNTR8hfQGnFI65m",
            state: "block",
            weight: 4,
        },
        {
            id: "_dfj8m1xZqA2AGLZ",
            state: "block",
            weight: 5,
        },
        {
            id: "oM07l6WA1oqBF0a2",
            state: "block",
            weight: 7,
        },
        {
            id: "K5U57d59dW_4z_N-",
            state: "block",
            weight: 8,
        },
        {
            id: "rijxrlApAey5VkGh",
            state: "block",
            weight: 0,
        },
    ],
    [
        {
            id: "EVCEEhn90Gmvxp2c",
            state: "empty",
            weight: 9,
        },
        {
            id: "hcng1pqmR2K7PnNe",
            state: "empty",
            weight: 0,
        },
        {
            id: "leK7BANtNxzSrkWc",
            state: "empty",
            weight: 9,
        },
        {
            id: "pl_qi4XRFmmhzPS5",
            state: "empty",
            weight: 9,
        },
        {
            id: "cBzILrTqTT40LsTr",
            state: "block",
            weight: 2,
        },
        {
            id: "pcMSHIU7eeVIOZtY",
            state: "empty",
            weight: 8,
        },
        {
            id: "xF9RGjuDo93Ddvwv",
            state: "empty",
            weight: 0,
        },
        {
            id: "Z0dYi_EQ5OtM-MMH",
            state: "empty",
            weight: 4,
        },
        {
            id: "X93Vsz95jNaC0DXq",
            state: "empty",
            weight: 5,
        },
        {
            id: "uqL3a25hJJk0aUVE",
            state: "empty",
            weight: 8,
        },
    ],
    [
        {
            id: "41G18N2D0dItvXkR",
            state: "empty",
            weight: 1,
        },
        {
            id: "5xV6DJywFNySCs7V",
            state: "empty",
            weight: 4,
        },
        {
            id: "X83rrzZBykzmb_Us",
            state: "empty",
            weight: 6,
        },
        {
            id: "va2-HzjT2MWps8c6",
            state: "empty",
            weight: 1,
        },
        {
            id: "DZJWw-8AsB9ZjTRq",
            state: "block",
            weight: 2,
        },
        {
            id: "1m4nU-B3h8vD_TRK",
            state: "empty",
            weight: 6,
        },
        {
            id: "6BhW0qYD4ip_iWCq",
            state: "empty",
            weight: 9,
        },
        {
            id: "I2sbDpgZ_OGEMNMl",
            state: "empty",
            weight: 6,
        },
        {
            id: "aYmyeCLvIvKVjPCD",
            state: "empty",
            weight: 0,
        },
        {
            id: "TKFvnd6Ux4vPhPOY",
            state: "empty",
            weight: 4,
        },
    ],
    [
        {
            id: "235jFDfRmynuxlo_",
            state: "empty",
            weight: 2,
        },
        {
            id: "z2nFaFHNfiECoHWk",
            state: "empty",
            weight: 2,
        },
        {
            id: "FJc0IVH3zH1C2vds",
            state: "empty",
            weight: 3,
        },
        {
            id: "g2eDq_AKwwTsdQmf",
            state: "empty",
            weight: 3,
        },
        {
            id: "ZM8gNff2rEeJqZvD",
            state: "block",
            weight: 7,
        },
        {
            id: "L4NT59ARgVWDAyRl",
            state: "empty",
            weight: 1,
        },
        {
            id: "U5TO6QE0ZefDYdO0",
            state: "empty",
            weight: 0,
        },
        {
            id: "iSepaSM6avicm3Le",
            state: "empty",
            weight: 5,
        },
        {
            id: "-cY9d3DBtBA4LNR4",
            state: "empty",
            weight: 4,
        },
        {
            id: "TcW8W-X3mJFgYfoX",
            state: "empty",
            weight: 8,
        },
    ],
    [
        {
            id: "ZJP3A8QxLAtbgdpP",
            state: "empty",
            weight: 5,
        },
        {
            id: "7iDjdKmtE0ZGlOyX",
            state: "empty",
            weight: 9,
        },
        {
            id: "EQZY_SUbtg-SaxjD",
            state: "empty",
            weight: 4,
        },
        {
            id: "EjJ_eEM7c8Q6UxZg",
            state: "empty",
            weight: 6,
        },
        {
            id: "_GvnU3js198NoUQM",
            state: "block",
            weight: 0,
        },
        {
            id: "zscYEc7-sm4oFX0Y",
            state: "empty",
            weight: 2,
        },
        {
            id: "8d63NF9k18_Pae3e",
            state: "empty",
            weight: 6,
        },
        {
            id: "UJlGipWOh9PFv9Wh",
            state: "empty",
            weight: 0,
        },
        {
            id: "XQbqMyTrIvCfkYgS",
            state: "empty",
            weight: 3,
        },
        {
            id: "-PQ-1hbD3DqJR27Q",
            state: "empty",
            weight: 1,
        },
    ],
    [
        {
            id: "id9CTtARcKq6n2uc",
            state: "empty",
            weight: 6,
        },
        {
            id: "vu6EjJXaOnrpEz-w",
            state: "empty",
            weight: 0,
        },
        {
            id: "FjA_M43TI6NV_Unq",
            state: "empty",
            weight: 8,
        },
        {
            id: "STlx9PrhG3Wn6-_x",
            state: "empty",
            weight: 0,
        },
        {
            id: "MGJAwgol95_-Egio",
            state: "block",
            weight: 6,
        },
        {
            id: "0flNXlS9c3Bjn0nR",
            state: "empty",
            weight: 5,
        },
        {
            id: "Hh2s8OAj1f9N6WXe",
            state: "empty",
            weight: 2,
        },
        {
            id: "-1OW7aSJN5ycixrF",
            state: "empty",
            weight: 0,
        },
        {
            id: "bL_63LOMsvb3XIF7",
            state: "empty",
            weight: 1,
        },
        {
            id: "0iZTv9aRu5pQBx1A",
            state: "finish",
            weight: 2,
        },
    ],
] as CellData[][]

export const MAZE_WITH_UNBLOCKED_FINISH = [
    [
        {
            id: "mIlCfFDxwxHDE8ZK",
            state: "start",
            weight: 0,
        },
        {
            id: "BQAMpbui7kYKmdrA",
            state: "block",
            weight: 8,
        },
        {
            id: "7ay3wtx66wCYfrU0",
            state: "empty",
            weight: 4,
        },
        {
            id: "dd9NiFsmtmQGuGIw",
            state: "empty",
            weight: 9,
        },
        {
            id: "5auVdG8k4eRDcrpX",
            state: "empty",
            weight: 2,
        },
        {
            id: "ohWDdF7VSQ-GTWci",
            state: "block",
            weight: 8,
        },
        {
            id: "XXVbmCthrYiifxNK",
            state: "empty",
            weight: 7,
        },
        {
            id: "d099fpfsuY1bkU8J",
            state: "empty",
            weight: 1,
        },
        {
            id: "bBxE-_ix4HJP7hb0",
            state: "empty",
            weight: 4,
        },
        {
            id: "apds9Ej5vMccukfw",
            state: "block",
            weight: 8,
        },
    ],
    [
        {
            id: "NX_Cl3n7YNHWGGVG",
            state: "empty",
            weight: 9,
        },
        {
            id: "Z28TA8ZMZoF-qwaS",
            state: "block",
            weight: 0,
        },
        {
            id: "EmxIqh_Dqt3gfaMG",
            state: "empty",
            weight: 3,
        },
        {
            id: "Pj6PssK3hGd4YSjw",
            state: "block",
            weight: 0,
        },
        {
            id: "d3tZtmgFwqnp0oXJ",
            state: "empty",
            weight: 6,
        },
        {
            id: "JokDt8BkW857cwhL",
            state: "block",
            weight: 5,
        },
        {
            id: "jwBtxJ4lQ3Er6ub7",
            state: "empty",
            weight: 6,
        },
        {
            id: "k1SKPklbtqBPxOu0",
            state: "block",
            weight: 0,
        },
        {
            id: "DH_G_5UUdG4Gurnq",
            state: "empty",
            weight: 0,
        },
        {
            id: "WjsPGXiLO74WLy4P",
            state: "empty",
            weight: 6,
        },
    ],
    [
        {
            id: "I-uJNMiJVFa7fB5k",
            state: "empty",
            weight: 3,
        },
        {
            id: "qB_k5on9qA9gUOeD",
            state: "block",
            weight: 9,
        },
        {
            id: "4U0M8bwJOnjcs0gg",
            state: "empty",
            weight: 0,
        },
        {
            id: "omof_MDPCN-SG4g5",
            state: "block",
            weight: 5,
        },
        {
            id: "YjCKskrTCcPGw3W9",
            state: "empty",
            weight: 2,
        },
        {
            id: "aji1_81VinWzUhmv",
            state: "block",
            weight: 9,
        },
        {
            id: "7S9GudY63qtQzKFU",
            state: "empty",
            weight: 7,
        },
        {
            id: "CCMzjSeetVkAnpJ2",
            state: "block",
            weight: 2,
        },
        {
            id: "StLzHThY9y0wfbAv",
            state: "block",
            weight: 7,
        },
        {
            id: "EhunInhX56WeHaY7",
            state: "empty",
            weight: 7,
        },
    ],
    [
        {
            id: "a_L4YcC9ejJD0K-f",
            state: "empty",
            weight: 7,
        },
        {
            id: "P6raxwFHdPN7g0Lp",
            state: "block",
            weight: 2,
        },
        {
            id: "i5zCvz_WFl54sQbD",
            state: "empty",
            weight: 3,
        },
        {
            id: "MuixDtaDf7DceHVA",
            state: "block",
            weight: 7,
        },
        {
            id: "fZnn8gRJvznwm2fI",
            state: "empty",
            weight: 7,
        },
        {
            id: "SajreG8tQyT8rFn3",
            state: "block",
            weight: 1,
        },
        {
            id: "2iNWdq4so8fPE52J",
            state: "empty",
            weight: 0,
        },
        {
            id: "4Wdw-DXmW1BrtX0f",
            state: "block",
            weight: 5,
        },
        {
            id: "zWKvwdmooN60PU6W",
            state: "empty",
            weight: 5,
        },
        {
            id: "zrHPLnbrM4j0Psed",
            state: "empty",
            weight: 9,
        },
    ],
    [
        {
            id: "RT3EFsfvdVBjdW2S",
            state: "empty",
            weight: 4,
        },
        {
            id: "sr901l_lI1mLsvwX",
            state: "block",
            weight: 6,
        },
        {
            id: "yX1tlMEtY7KV8fE0",
            state: "empty",
            weight: 5,
        },
        {
            id: "M7B3OyhjH1h3xSuu",
            state: "block",
            weight: 1,
        },
        {
            id: "veVDBjeQfU609vO6",
            state: "empty",
            weight: 7,
        },
        {
            id: "J7_ietRYx2TKeUig",
            state: "block",
            weight: 8,
        },
        {
            id: "Sq2Vj5adCFf-3udC",
            state: "empty",
            weight: 0,
        },
        {
            id: "ELqOu4r1xf04x96u",
            state: "block",
            weight: 1,
        },
        {
            id: "QdwKDCf0lfR4wfp7",
            state: "empty",
            weight: 9,
        },
        {
            id: "UoVjLKtat-rKfrjA",
            state: "block",
            weight: 2,
        },
    ],
    [
        {
            id: "546Cx5BwHrAQOqXt",
            state: "empty",
            weight: 4,
        },
        {
            id: "2x1Wp8HHJ59VoO0v",
            state: "block",
            weight: 5,
        },
        {
            id: "HOehRAfaUs68vyRv",
            state: "empty",
            weight: 0,
        },
        {
            id: "figfRXEAPUZRWAdG",
            state: "block",
            weight: 5,
        },
        {
            id: "LOkN6Lh_vDWhP6wa",
            state: "empty",
            weight: 0,
        },
        {
            id: "2jLaaO3iav4UYxP6",
            state: "block",
            weight: 4,
        },
        {
            id: "LbilMj5SKnLlTRSW",
            state: "empty",
            weight: 1,
        },
        {
            id: "QvMCo7EZy3FnPcS2",
            state: "block",
            weight: 3,
        },
        {
            id: "H7TuBFRtTh_ih1X4",
            state: "empty",
            weight: 3,
        },
        {
            id: "xz6QEurFm9EQDQlY",
            state: "empty",
            weight: 1,
        },
    ],
    [
        {
            id: "Juf3RKhTWuP6vpQR",
            state: "empty",
            weight: 4,
        },
        {
            id: "Ia9StPwO4aufsDXQ",
            state: "block",
            weight: 6,
        },
        {
            id: "rAynDAe7RssWSJPR",
            state: "empty",
            weight: 4,
        },
        {
            id: "qe1V72jdZOUeKhRP",
            state: "block",
            weight: 0,
        },
        {
            id: "kvzUExNEbGCmIu8k",
            state: "empty",
            weight: 6,
        },
        {
            id: "SduvMClcpfMLI3Ef",
            state: "block",
            weight: 0,
        },
        {
            id: "pKxoFY3jcNx6syAu",
            state: "empty",
            weight: 9,
        },
        {
            id: "FWjn0wmSyt5nU_0e",
            state: "block",
            weight: 9,
        },
        {
            id: "496N3Ps-DN3T8Lfw",
            state: "block",
            weight: 0,
        },
        {
            id: "bT37_cDLlZlv2gu7",
            state: "empty",
            weight: 5,
        },
    ],
    [
        {
            id: "J5z9uKD6Ubh5Sjgu",
            state: "empty",
            weight: 6,
        },
        {
            id: "UxVBRCelTJCZgHLQ",
            state: "block",
            weight: 1,
        },
        {
            id: "vd_iKp6_O_bZ1YQT",
            state: "empty",
            weight: 3,
        },
        {
            id: "KEeWRUH91a4LQGWd",
            state: "block",
            weight: 9,
        },
        {
            id: "WR2I8XJZLJZePvXC",
            state: "empty",
            weight: 1,
        },
        {
            id: "QpKXopS6-8e-iFuK",
            state: "block",
            weight: 6,
        },
        {
            id: "y6bTABH8lPcAdvpo",
            state: "empty",
            weight: 4,
        },
        {
            id: "aZNsjtHFcO0a65hi",
            state: "block",
            weight: 9,
        },
        {
            id: "ZV0T83kshzHxj7q7",
            state: "empty",
            weight: 2,
        },
        {
            id: "ERvJi52-gw0nXIRY",
            state: "empty",
            weight: 4,
        },
    ],
    [
        {
            id: "D_50VTnVIcHKeLEi",
            state: "empty",
            weight: 5,
        },
        {
            id: "7BYSUm2M4-4Zwww7",
            state: "block",
            weight: 4,
        },
        {
            id: "z9qLVxWqXLPl_FyP",
            state: "empty",
            weight: 3,
        },
        {
            id: "l6ChIshEYXBtpB9L",
            state: "block",
            weight: 4,
        },
        {
            id: "HPfrcNAsN-CvRdAI",
            state: "empty",
            weight: 1,
        },
        {
            id: "a5Uh_tDwvjVa-frL",
            state: "block",
            weight: 4,
        },
        {
            id: "rZ1T9ui-JRIjPtev",
            state: "empty",
            weight: 8,
        },
        {
            id: "v2lxj93D_lMArcJV",
            state: "block",
            weight: 1,
        },
        {
            id: "7LljjFZjFdWY8gZG",
            state: "empty",
            weight: 1,
        },
        {
            id: "lFO7vDVrx2hwRWcz",
            state: "block",
            weight: 2,
        },
    ],
    [
        {
            id: "96uqN_7sRIcgL1es",
            state: "empty",
            weight: 5,
        },
        {
            id: "djz8QF_PmHdAPDy3",
            state: "empty",
            weight: 1,
        },
        {
            id: "61Q2Q_Tx7r02ljEe",
            state: "empty",
            weight: 5,
        },
        {
            id: "TlERRLGfRptTvLkP",
            state: "block",
            weight: 0,
        },
        {
            id: "DrImV_V5ctyts-4w",
            state: "empty",
            weight: 9,
        },
        {
            id: "lQM2905tlF89JlEW",
            state: "empty",
            weight: 3,
        },
        {
            id: "-cEqixQxXVZhQvIY",
            state: "empty",
            weight: 0,
        },
        {
            id: "m3_RK7bl0_OCKX3Z",
            state: "block",
            weight: 3,
        },
        {
            id: "kJZMqX06dquxrJld",
            state: "empty",
            weight: 1,
        },
        {
            id: "XApbdGDaaXgT4OI2",
            state: "finish",
            weight: 1,
        },
    ],
] as CellData[][]
