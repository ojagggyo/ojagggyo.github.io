const datas = [
'2020/1/16',1.0,
'2020/1/17',0.0,
'2020/1/18',0.0,
'2020/1/19',0.0,
'2020/1/20',0.0,
'2020/1/21',0.0,
'2020/1/22',0.0,
'2020/1/23',0.0,
'2020/1/24',1.0,
'2020/1/25',1.0,
'2020/1/26',1.0,
'2020/1/27',0.0,
'2020/1/28',3.0,
'2020/1/29',1.0,
'2020/1/30',4.0,
'2020/1/31',0.0,
'2020/2/1',0.0,
'2020/2/2',0.0,
'2020/2/3',0.0,
'2020/2/4',1.0,
'2020/2/5',2.0,
'2020/2/6',0.0,
'2020/2/7',0.0,
'2020/2/8',0.0,
'2020/2/9',0.0,
'2020/2/10',0.0,
'2020/2/11',1.0,
'2020/2/12',1.0,
'2020/2/13',3.0,
'2020/2/14',5.0,
'2020/2/15',4.0,
'2020/2/16',1.0,
'2020/2/17',6.0,
'2020/2/18',8.0,
'2020/2/19',9.0,
'2020/2/20',8.0,
'2020/2/21',13.0,
'2020/2/22',23.0,
'2020/2/23',10.0,
'2020/2/24',16.0,
'2020/2/25',8.0,
'2020/2/26',22.0,
'2020/2/27',24.0,
'2020/2/28',19.0,
'2020/2/29',9.0,
'2020/3/1',14.0,
'2020/3/2',14.0,
'2020/3/3',22.0,
'2020/3/4',34.0,
'2020/3/5',33.0,
'2020/3/6',54.0,
'2020/3/7',44.0,
'2020/3/8',35.0,
'2020/3/9',27.0,
'2020/3/10',60.0,
'2020/3/11',52.0,
'2020/3/12',55.0,
'2020/3/13',34.0,
'2020/3/14',62.0,
'2020/3/15',29.0,
'2020/3/16',16.0,
'2020/3/17',45.0,
'2020/3/18',39.0,
'2020/3/19',39.0,
'2020/3/20',52.0,
'2020/3/21',35.0,
'2020/3/22',45.0,
'2020/3/23',39.0,
'2020/3/24',89.0,
'2020/3/25',93.0,
'2020/3/26',93.0,
'2020/3/27',96.0,
'2020/3/28',222.0,
'2020/3/29',151.0,
'2020/3/30',80.0,
'2020/3/31',227.0,
'2020/4/1',257.0,
'2020/4/2',281.0,
'2020/4/3',353.0,
'2020/4/4',365.0,
'2020/4/5',346.0,
'2020/4/6',248.0,
'2020/4/7',365.0,
'2020/4/8',522.0,
'2020/4/9',574.0,
'2020/4/10',640.0,
'2020/4/11',644.0,
'2020/4/12',486.0,
'2020/4/13',387.0,
'2020/4/14',446.0,
'2020/4/15',552.0,
'2020/4/16',558.0,
'2020/4/17',572.0,
'2020/4/18',577.0,
'2020/4/19',377.0,
'2020/4/20',346.0,
'2020/4/21',389.0,
'2020/4/22',446.0,
'2020/4/23',439.0,
'2020/4/24',444.0,
'2020/4/25',371.0,
'2020/4/26',224.0,
'2020/4/27',182.0,
'2020/4/28',279.0,
'2020/4/29',217.0,
'2020/4/30',202.0,
'2020/5/1',282.0,
'2020/5/2',288.0,
'2020/5/3',195.0,
'2020/5/4',181.0,
'2020/5/5',119.0,
'2020/5/6',104.0,
'2020/5/7',107.0,
'2020/5/8',88.0,
'2020/5/9',108.0,
'2020/5/10',66.0,
'2020/5/11',58.0,
'2020/5/12',87.0,
'2020/5/13',55.0,
'2020/5/14',99.0,
'2020/5/15',55.0,
'2020/5/16',56.0,
'2020/5/17',29.0,
'2020/5/18',30.0,
'2020/5/19',32.0,
'2020/5/20',37.0,
'2020/5/21',45.0,
'2020/5/22',30.0,
'2020/5/23',30.0,
'2020/5/24',40.0,
'2020/5/25',22.0,
'2020/5/26',27.0,
'2020/5/27',37.0,
'2020/5/28',62.0,
'2020/5/29',63.0,
'2020/5/30',46.0,
'2020/5/31',33.0,
'2020/6/1',36.0,
'2020/6/2',51.0,
'2020/6/3',26.0,
'2020/6/4',45.0,
'2020/6/5',41.0,
'2020/6/6',45.0,
'2020/6/7',32.0,
'2020/6/8',22.0,
'2020/6/9',30.0,
'2020/6/10',36.0,
'2020/6/11',40.0,
'2020/6/12',57.0,
'2020/6/13',43.0,
'2020/6/14',62.0,
'2020/6/15',60.0,
'2020/6/16',42.0,
'2020/6/17',43.0,
'2020/6/18',68.0,
'2020/6/19',54.0,
'2020/6/20',65.0,
'2020/6/21',48.0,
'2020/6/22',40.0,
'2020/6/23',53.0,
'2020/6/24',89.0,
'2020/6/25',79.0,
'2020/6/26',99.0,
'2020/6/27',88.0,
'2020/6/28',111.0,
'2020/6/29',110.0,
'2020/6/30',132.0,
'2020/7/1',125.0,
'2020/7/2',194.0,
'2020/7/3',249.0,
'2020/7/4',268.0,
'2020/7/5',195.0,
'2020/7/6',174.0,
'2020/7/7',203.0,
'2020/7/8',203.0,
'2020/7/9',352.0,
'2020/7/10',418.0,
'2020/7/11',374.0,
'2020/7/12',390.0,
'2020/7/13',246.0,
'2020/7/14',326.0,
'2020/7/15',438.0,
'2020/7/16',619.0,
'2020/7/17',588.0,
'2020/7/18',654.0,
'2020/7/19',501.0,
'2020/7/20',405.0,
'2020/7/21',618.0,
'2020/7/22',792.0,
'2020/7/23',966.0,
'2020/7/24',766.0,
'2020/7/25',796.0,
'2020/7/26',834.0,
'2020/7/27',583.0,
'2020/7/28',971.0,
'2020/7/29',1245.0,
'2020/7/30',1305.0,
'2020/7/31',1575.0,
'2020/8/1',1537.0,
'2020/8/2',1325.0,
'2020/8/3',941.0,
'2020/8/4',1240.0,
'2020/8/5',1344.0,
'2020/8/6',1479.0,
'2020/8/7',1597.0,
'2020/8/8',1521.0,
'2020/8/9',1485.0,
'2020/8/10',829.0,
'2020/8/11',691.0,
'2020/8/12',969.0,
'2020/8/13',1175.0,
'2020/8/14',1355.0,
'2020/8/15',1233.0,
'2020/8/16',1015.0,
'2020/8/17',630.0,
'2020/8/18',903.0,
'2020/8/19',1078.0,
'2020/8/20',1176.0,
'2020/8/21',1035.0,
'2020/8/22',985.0,
'2020/8/23',737.0,
'2020/8/24',491.0,
'2020/8/25',709.0,
'2020/8/26',893.0,
'2020/8/27',870.0,
'2020/8/28',869.0,
'2020/8/29',841.0,
'2020/8/30',598.0,
'2020/8/31',430.0,
'2020/9/1',624.0,
'2020/9/2',585.0,
'2020/9/3',654.0,
'2020/9/4',582.0,
'2020/9/5',598.0,
'2020/9/6',447.0,
'2020/9/7',285.0,
'2020/9/8',510.0,
'2020/9/9',507.0,
'2020/9/10',709.0,
'2020/9/11',637.0,
'2020/9/12',639.0,
'2020/9/13',438.0,
'2020/9/14',262.0,
'2020/9/15',530.0,
'2020/9/16',543.0,
'2020/9/17',478.0,
'2020/9/18',569.0,
'2020/9/19',592.0,
'2020/9/20',469.0,
'2020/9/21',306.0,
'2020/9/22',321.0,
'2020/9/23',216.0,
'2020/9/24',475.0,
'2020/9/25',567.0,
'2020/9/26',634.0,
'2020/9/27',478.0,
'2020/9/28',294.0,
'2020/9/29',527.0,
'2020/9/30',569.0,
'2020/10/1',619.0,
'2020/10/2',537.0,
'2020/10/3',562.0,
'2020/10/4',394.0,
'2020/10/5',269.0,
'2020/10/6',495.0,
'2020/10/7',502.0,
'2020/10/8',623.0,
'2020/10/9',594.0,
'2020/10/10',666.0,
'2020/10/11',431.0,
'2020/10/12',272.0,
'2020/10/13',491.0,
'2020/10/14',550.0,
'2020/10/15',703.0,
'2020/10/16',633.0,
'2020/10/17',611.0,
'2020/10/18',422.0,
'2020/10/19',313.0,
'2020/10/20',475.0,
'2020/10/21',611.0,
'2020/10/22',609.0,
'2020/10/23',742.0,
'2020/10/24',712.0,
'2020/10/25',486.0,
'2020/10/26',401.0,
'2020/10/27',646.0,
'2020/10/28',724.0,
'2020/10/29',803.0,
'2020/10/30',767.0,
'2020/10/31',866.0,
'2020/11/1',603.0,
'2020/11/2',480.0,
'2020/11/3',860.0,
'2020/11/4',606.0,
'2020/11/5',1046.0,
'2020/11/6',1137.0,
'2020/11/7',1301.0,
'2020/11/8',934.0,
'2020/11/9',770.0,
'2020/11/10',1276.0,
'2020/11/11',1540.0,
'2020/11/12',1624.0,
'2020/11/13',1703.0,
'2020/11/14',1721.0,
'2020/11/15',1428.0,
'2020/11/16',949.0,
'2020/11/17',1685.0,
'2020/11/18',2173.0,
'2020/11/19',2382.0,
'2020/11/20',2425.0,
'2020/11/21',2570.0,
'2020/11/22',2146.0,
'2020/11/23',1513.0,
'2020/11/24',1219.0,
'2020/11/25',1925.0,
'2020/11/26',2494.0,
'2020/11/27',2510.0,
'2020/11/28',2667.0,
'2020/11/29',2046.0,
'2020/11/30',1425.0,
'2020/12/1',2014.0,
'2020/12/2',2419.0,
'2020/12/3',2505.0,
'2020/12/4',2435.0,
'2020/12/5',2496.0,
'2020/12/6',2010.0,
'2020/12/7',1502.0,
'2020/12/8',2166.0,
'2020/12/9',2801.0,
'2020/12/10',2966.0,
'2020/12/11',2795.0,
'2020/12/12',3010.0,
'2020/12/13',2375.0,
'2020/12/14',1681.0,
'2020/12/15',2400.0,
'2020/12/16',2990.0,
'2020/12/17',3206.0,
'2020/12/18',2832.0,
'2020/12/19',3040.0,
'2020/12/20',2398.0,
'2020/12/21',1791.0,
'2020/12/22',2674.0,
'2020/12/23',3270.0,
'2020/12/24',3797.0,
'2020/12/25',3934.0,
'2020/12/26',3702.0,
'2020/12/27',2942.0,
'2020/12/28',2397.0,
'2020/12/29',3609.0,
'2020/12/30',3884.0,
'2020/12/31',4500.0,
'2021/1/1',3248.0,
'2021/1/2',3057.0,
'2021/1/3',3139.0,
'2021/1/4',3330.0,
'2021/1/5',4958.0,
'2021/1/6',6066.0,
'2021/1/7',7793.0,
'2021/1/8',8045.0,
'2021/1/9',7528.0,
'2021/1/10',6130.0,
'2021/1/11',4901.0,
'2021/1/12',4630.0,
'2021/1/13',6086.0,
'2021/1/14',6749.0,
'2021/1/15',6795.0,
'2021/1/16',7028.0,
'2021/1/17',5758.0,
'2021/1/18',4947.0,
'2021/1/19',5355.0,
'2021/1/20',5643.0,
'2021/1/21',5743.0,
'2021/1/22',4821.0,
'2021/1/23',4711.0,
'2021/1/24',3988.0,
'2021/1/25',2760.0,
'2021/1/26',3851.0,
'2021/1/27',3968.0,
'2021/1/28',4122.0,
'2021/1/29',3547.0,
'2021/1/30',3330.0,
'2021/1/31',2673.0,
'2021/2/1',1782.0,
'2021/2/2',2321.0,
'2021/2/3',2648.0,
'2021/2/4',2574.0,
'2021/2/5',2371.0,
'2021/2/6',2277.0,
'2021/2/7',1627.0,
'2021/2/8',1215.0,
'2021/2/9',1568.0,
'2021/2/10',1885.0,
'2021/2/11',1689.0,
'2021/2/12',1297.0,
'2021/2/13',1355.0,
'2021/2/14',1360.0,
'2021/2/15',964.0,
'2021/2/16',1305.0,
'2021/2/17',1443.0,
'2021/2/18',1540.0,
'2021/2/19',1297.0,
'2021/2/20',1228.0,
'2021/2/21',1029.0,
'2021/2/22',739.0,
'2021/2/23',1078.0,
'2021/2/24',923.0,
'2021/2/25',1064.0,
'2021/2/26',1057.0,
'2021/2/27',1208.0,
'2021/2/28',994.0,
'2021/3/1',684.0,
'2021/3/2',887.0,
'2021/3/3',1240.0,
'2021/3/4',1168.0,
'2021/3/5',1145.0,
'2021/3/6',1045.0,
'2021/3/7',1061.0,
'2021/3/8',599.0,
'2021/3/9',1125.0,
'2021/3/10',1309.0,
'2021/3/11',1315.0,
'2021/3/12',1268.0,
'2021/3/13',1317.0,
'2021/3/14',982.0,
'2021/3/15',688.0,
'2021/3/16',1130.0,
'2021/3/17',1520.0,
'2021/3/18',1492.0,
'2021/3/19',1453.0,
'2021/3/20',1517.0,
'2021/3/21',1110.0,
'2021/3/22',817.0,
'2021/3/23',1485.0,
'2021/3/24',1924.0,
'2021/3/25',1914.0,
'2021/3/26',2030.0,
'2021/3/27',2073.0,
'2021/3/28',1753.0,
'2021/3/29',1340.0,
'2021/3/30',2077.0,
'2021/3/31',2832.0,
'2021/4/1',2598.0,
'2021/4/2',2745.0,
'2021/4/3',2755.0,
'2021/4/4',2460.0,
'2021/4/5',1554.0,
'2021/4/6',2654.0,
'2021/4/7',3460.0,
'2021/4/8',3457.0,
'2021/4/9',3511.0,
'2021/4/10',3742.0,
'2021/4/11',2848.0,
'2021/4/12',2098.0,
'2021/4/13',3444.0,
'2021/4/14',4302.0,
'2021/4/15',4570.0,
'2021/4/16',4519.0,
'2021/4/17',4791.0,
'2021/4/18',4089.0,
'2021/4/19',2892.0,
'2021/4/20',4328.0,
'2021/4/21',5280.0,
'2021/4/22',5474.0,
'2021/4/23',5118.0,
'2021/4/24',5602.0,
'2021/4/25',4604.0,
'2021/4/26',3303.0,
'2021/4/27',4958.0,
'2021/4/28',5788.0,
'2021/4/29',5895.0,
'2021/4/30',4658.0,
'2021/5/1',5990.0,
'2021/5/2',5882.0,
'2021/5/3',4458.0,
'2021/5/4',4199.0,
'2021/5/5',4055.0,
'2021/5/6',4352.0,
'2021/5/7',6032.0,
'2021/5/8',7239.0,
'2021/5/9',6491.0,
'2021/5/10',4925.0,
'2021/5/11',6237.0,
'2021/5/12',7057.0,
'2021/5/13',6866.0,
'2021/5/14',6269.0,
'2021/5/15',6420.0,
'2021/5/16',5247.0,
'2021/5/17',3676.0,
'2021/5/18',5228.0,
'2021/5/19',5811.0,
'2021/5/20',5711.0,
'2021/5/21',5250.0,
'2021/5/22',5034.0,
'2021/5/23',4035.0,
'2021/5/24',2710.0,
'2021/5/25',3896.0,
'2021/5/26',4526.0,
'2021/5/27',4131.0,
'2021/5/28',3706.0,
'2021/5/29',3587.0,
'2021/5/30',2876.0,
'2021/5/31',1786.0,
'2021/6/1',2640.0,
'2021/6/2',3031.0,
'2021/6/3',2825.0,
'2021/6/4',2586.0,
'2021/6/5',2648.0,
'2021/6/6',2017.0,
'2021/6/7',1276.0,
'2021/6/8',1883.0,
'2021/6/9',2224.0,
'2021/6/10',2044.0,
'2021/6/11',1934.0,
'2021/6/12',1941.0,
'2021/6/13',1384.0,
'2021/6/14',930.0,
'2021/6/15',1418.0,
'2021/6/16',1697.0,
'2021/6/17',1550.0,
'2021/6/18',1619.0,
'2021/6/19',1509.0,
'2021/6/20',1304.0,
'2021/6/21',864.0,
'2021/6/22',1432.0,
'2021/6/23',1775.0,
'2021/6/24',1669.0,
'2021/6/25',1705.0,
'2021/6/26',1619.0,
'2021/6/27',1280.0,
'2021/6/28',989.0,
'2021/6/29',1376.0,
'2021/6/30',1810.0,
'2021/7/1',1741.0,
'2021/7/2',1773.0,
'2021/7/3',1864.0,
'2021/7/4',1479.0,
'2021/7/5',1021.0,
'2021/7/6',1658.0,
'2021/7/7',2181.0,
'2021/7/8',2239.0,
'2021/7/9',2259.0,
'2021/7/10',2452.0,
'2021/7/11',2021.0,
'2021/7/12',1491.0,
'2021/7/13',2377.0,
'2021/7/14',3170.0,
'2021/7/15',3408.0,
'2021/7/16',3419.0,
'2021/7/17',3871.0,
'2021/7/18',3093.0,
'2021/7/19',2318.0,
'2021/7/20',3743.0,
'2021/7/21',4933.0,
'2021/7/22',5385.0,
'2021/7/23',4204.0,
'2021/7/24',3576.0,
'2021/7/25',5008.0,
'2021/7/26',4659.0,
'2021/7/27',7619.0,
'2021/7/28',9568.0,
'2021/7/29',10687.0,
'2021/7/30',10728.0,
'2021/7/31',12328.0,
'2021/8/1',10160.0,
'2021/8/2',8324.0,
'2021/8/3',12060.0,
'2021/8/4',14202.0,
'2021/8/5',15246.0,
'2021/8/6',15624.0,
'2021/8/7',15739.0,
'2021/8/8',14456.0,
'2021/8/9',12053.0,
'2021/8/10',10565.0,
'2021/8/11',15769.0,
'2021/8/12',18894.0,
'2021/8/13',20357.0,
'2021/8/14',20132.0,
'2021/8/15',17824.0,
'2021/8/16',14824.0,
'2021/8/17',19947.0,
'2021/8/18',23910.0,
'2021/8/19',25140.0,
'2021/8/20',25851.0,
'2021/8/21',25460.0,
'2021/8/22',22271.0,
'2021/8/23',16836.0,
'2021/8/24',21556.0,
'2021/8/25',24308.0,
'2021/8/26',24961.0,
'2021/8/27',24182.0,
'2021/8/28',22728.0,
'2021/8/29',19296.0,
'2021/8/30',13614.0,
'2021/8/31',17696.0,
'2021/9/1',20021.0,
'2021/9/2',18208.0,
'2021/9/3',16724.0,
'2021/9/4',15995.0,
'2021/9/5',12890.0,
'2021/9/6',8223.0,
'2021/9/7',10585.0,
'2021/9/8',12378.0,
'2021/9/9',10377.0,
'2021/9/10',8864.0,
'2021/9/11',8787.0,
'2021/9/12',6414.0,
'2021/9/13',3052.0,
'2021/9/14',6563.0,
'2021/9/15',6788.0,
'2021/9/16',5425.0,
'2021/9/17',4706.0,
'2021/9/18',4502.0,
'2021/9/19',3231.0,
'2021/9/20',1905.0,
'2021/9/21',1517.0,
'2021/9/22',3601.0,
'2021/9/23',3786.0,
'2021/9/24',1654.0,
'2021/9/25',2662.0,
'2021/9/26',2071.0,
'2021/9/27',1032.0,
'2021/9/28',1939.0,
'2021/9/29',1999.0,
'2021/9/30',1555.0,
'2021/10/1',1353.0,
'2021/10/2',1327.0,
'2021/10/3',865.0,
'2021/10/4',495.0,
'2021/10/5',1107.0,
'2021/10/6',1171.0,
'2021/10/7',906.0,
'2021/10/8',806.0,
'2021/10/9',780.0,
'2021/10/10',579.0,
'2021/10/11',281.0,
'2021/10/12',663.0,
'2021/10/13',732.0,
'2021/10/14',612.0,
'2021/10/15',522.0,
'2021/10/16',502.0,
'2021/10/17',425.0,
'2021/10/18',223.0,
'2021/10/19',367.0,
'2021/10/20',387.0,
'2021/10/21',334.0,
'2021/10/22',324.0,
'2021/10/23',277.0,
'2021/10/24',229.0,
'2021/10/25',147.0,
'2021/10/26',309.0,
'2021/10/27',310.0,
];

