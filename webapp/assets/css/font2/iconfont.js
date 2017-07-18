;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-cuowu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M490.896565 42.685741C219.768471 42.685741 0 262.455718 0 533.582306c0 271.125082 219.768471 490.890541 490.896565 490.890541 271.125082 0 490.890541-219.765459 490.890541-490.890541C981.787106 262.455718 762.021647 42.685741 490.896565 42.685741zM705.198682 681.481035l-66.404894 66.404894c-6.668047 6.668047-17.477271 6.668047-24.145318 0l-123.756424-123.754918-123.753412 123.754918c-6.668047 6.666541-17.477271 6.666541-24.146824-0.001506l-66.4064-66.4064c-6.666541-6.668047-6.666541-17.477271 0-24.145318l123.754918-123.753412-123.753412-123.753412c-6.668047-6.668047-6.668047-17.478776-0.001506-24.146824l66.404894-66.403388c6.668047-6.669553 17.478776-6.668047 24.148329 0l123.753412 123.753412 123.753412-123.753412c6.669553-6.668047 17.478776-6.668047 24.146824 0l66.404894 66.404894c6.669553 6.669553 6.669553 17.478776 0.001506 24.148329l-123.754918 123.753412 123.754918 123.754918C711.866729 664.003765 711.866729 674.812988 705.198682 681.481035z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xiangshang" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M838.116 732.779 877.7 693.195 511.979 327.549 146.3 693.195 185.883 732.779 512.003 406.652Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-up" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M29.312 525.354667 512 42.666667 994.688 525.354667Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-naozhong" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M513.450667 186.146133c-207.394133 0-375.466667 168.106667-375.466667 375.466667 0 94.1056 34.7136 180.0704 91.938133 245.9648l-87.825067 107.6736 26.436267 21.572267 85.111467-104.2944c67.447467 64.699733 158.941867 104.533333 259.822933 104.533333 101.102933 0 192.802133-40.0384 260.317867-105.028267l85.060267 104.925867 26.538667-21.504-87.893333-108.4416c56.9344-65.826133 91.4432-151.569067 91.4432-245.4016C888.917333 354.2528 720.776533 186.146133 513.450667 186.146133zM513.450667 902.912c-188.2112 0-341.333333-153.105067-341.333333-341.2992 0-188.228267 153.122133-341.333333 341.333333-341.333333s341.333333 153.105067 341.333333 341.333333C854.784 749.824 701.661867 902.912 513.450667 902.912z"  ></path>' +
    '' +
    '<path d="M359.099733 83.712 257.706667 83.712c-94.2592 0-170.666667 76.407467-170.666667 170.666667l0 102.7072 48.5376 0L359.099733 132.283733 359.099733 83.712zM324.9664 118.2208 121.361067 322.952533 121.173333 322.952533l0-68.573867c0-75.264 61.252267-136.533333 136.533333-136.533333l67.259733 0L324.9664 118.2208z"  ></path>' +
    '' +
    '<path d="M769.706667 83.712l-101.461333 0 0 48.571733 223.573333 224.802133L940.373333 357.085867l0-102.7072C940.373333 160.119467 863.931733 83.712 769.706667 83.712zM906.24 322.952533l-0.238933 0L702.3616 118.2208 702.3616 117.845333 769.706667 117.845333c75.281067 0 136.533333 61.269333 136.533333 136.533333L906.24 322.952533z"  ></path>' +
    '' +
    '<path d="M496.64 561.578667 308.462933 561.578667 308.462933 595.712 530.773333 595.712 530.773333 288.512 496.64 288.512Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-fangzi" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M528.671193 89.161692l186.497555 152.72845 0.127913-77.003791 133.285632 0.127913 0.340761 183.982268 110.432135 116.997668-29.67588 31.722492L781.640672 336.716858l25.241894-10.915607 0.959861-119.919207-51.741431 0.064468-0.38374 107.575064-38.885636-15.036461L527.411503 144.676054l-405.121807 353.040638-26.605961-31.722492L528.671193 89.161692zM204.666868 901.410987l226.662323 0 0.340761-230.755548 190.334953-0.340761 0.682545 231.096309 226.15067 0L848.83812 545.532721l-40.932248 0 0 315.456648-144.797827 0 0-232.290507-272.711102 0.511653 0 231.778854-144.797827 0L245.599116 545.532721l-40.932248 0L204.666868 901.410987 204.666868 901.410987z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-fangzi1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M528.671193 89.161692l186.497555 152.72845 0.127913-77.003791 133.285632 0.127913 0.340761 183.982268 110.432135 116.997668-29.67588 31.722492L781.640672 336.716858l25.241894-10.915607 0.959861-119.919207-51.741431 0.064468-0.38374 107.575064-38.885636-15.036461L527.411503 144.676054l-405.121807 353.040638-26.605961-31.722492L528.671193 89.161692zM204.666868 901.410987l226.662323 0 0.340761-230.755548 190.334953-0.340761 0.682545 231.096309 226.15067 0L848.83812 545.532721l-40.932248 0 0 315.456648-144.797827 0 0-232.290507-272.711102 0.511653 0 231.778854-144.797827 0L245.599116 545.532721l-40.932248 0L204.666868 901.410987 204.666868 901.410987z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-youjiantou" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M337.520665 877.836059 337.520665 809.614282 627.455033 519.67275 337.520665 229.743498 337.520665 161.52172 695.688067 519.67275Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-arrowleft" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M828.113933 877.655166 385.088879 512 828.113933 146.344834C861.739799 112.802484 861.739799 58.524865 828.113933 25.156762 794.573412-8.385587 740.038061-8.385587 706.412194 25.156762L195.11127 447.093376C177.188853 464.866466 169.593165 488.65104 170.787991 512 169.593165 535.34896 177.188853 559.046411 195.11127 576.906624L706.412194 998.843238C740.038061 1032.385587 794.573412 1032.385587 828.113933 998.843238 861.739799 965.388013 861.739799 911.110394 828.113933 877.655166L828.113933 877.655166Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-arrowright" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M195.886067 877.655166 638.911121 512 195.886067 146.344834C162.2602 112.802484 162.2602 58.524865 195.886067 25.156762 229.426587-8.385587 283.961939-8.385587 317.587806 25.156762L828.888729 447.093376C846.811146 464.866466 854.406835 488.65104 853.212008 512 854.406835 535.34896 846.811146 559.046411 828.888729 576.906624L317.587806 998.843238C283.961939 1032.385587 229.426587 1032.385587 195.886067 998.843238 162.2602 965.388013 162.2602 911.110394 195.886067 877.655166L195.886067 877.655166Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-103" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 0C230.4 0 0 230.4 0 512c0 281.6 230.4 512 512 512 281.6 0 512-230.4 512-512C1024 230.4 793.6 0 512 0zM499.2 780.8c-25.6 25.6-70.4 25.6-96 0L179.2 563.2c-25.6-25.6-25.6-70.4 0-96 25.6-25.6 70.4-25.6 96 0L448 633.6l332.8-326.4c25.6-25.6 70.4-25.6 96 0 25.6 25.6 25.6 70.4 0 96L499.2 780.8z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-chevronright" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M469.1456 231.2192c21.4016 20.8896 230.5024 240.384 230.5024 240.384 11.4176 11.2128 17.152 25.8048 17.152 40.3968s-5.7344 29.184-17.152 40.2944c0 0-209.1008 219.5968-230.5024 240.384-21.4016 20.8896-59.904 22.3232-82.688 0-22.8352-22.2208-24.6272-53.2992 0-80.5888l191.8464-200.0896-191.8464-200.0896c-24.6272-27.2896-22.8352-58.4192 0-80.6912s61.2864-20.9408 82.688 0z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-control-arr" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M533.237697 689.076998 256.642125 382.251937l510.714727 0L533.237697 689.076998zM533.237697 689.076998"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-0031naozhong" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M736.969387 777.065813c8.215893 8.20224 16.1792 16.141653 24.128853 24.087893 13.5168 13.509973 27.163307 26.897067 40.502613 40.58112 13.69088 14.045867 7.611733 36.676267-11.086507 41.424213-9.54368 2.423467-17.75616-0.44032-24.70912-7.424-21.671253-21.766827-43.434667-43.43808-65.10592-65.20832-1.30048-1.307307-2.071893-3.136853-2.546347-3.874133-124.183893 70.437547-246.647467 70.427307-369.78688 0.556373-0.866987 0.826027-2.239147 2.071893-3.549867 3.382613-21.968213 21.951147-43.823787 44.018347-65.928533 65.829547-13.66016 13.479253-35.84 8.116907-41.222827-9.837227-2.962773-9.885013-0.252587-18.45248 7.017813-25.709227 19.930453-19.88608 39.81312-39.82336 59.764053-59.692373 1.317547-1.31072 3.034453-2.22208 4.63872-3.372373-82.691413-74.390187-124.99968-165.7344-121.514667-276.08064 3.054933-96.740693 41.693867-178.302293 112.85504-243.882667 137.294507-126.518613 353.047893-118.493867 482.737493 17.462613C897.798827 416.447147 890.2656 645.79584 736.969387 777.065813zM216.4224 513.590613c0.02048 163.157333 132.584107 296.26368 295.140693 296.35584 164.75136 0.09216 297.198933-131.689813 297.46176-295.963307 0.262827-163.723947-132.717227-296.884907-296.297813-296.704C349.06112 217.45664 216.40192 350.119253 216.4224 513.590613z"  ></path>' +
    '' +
    '<path d="M286.917973 142.687573c4.304213 0.822613 8.823467 1.06496 12.868267 2.577067 10.622293 3.969707 17.022293 15.418027 15.223467 26.187093-2.024107 12.100267-11.431253 20.852053-23.42912 21.067093-22.142293 0.395947-42.417493 6.41024-60.064427 19.90656-26.05056 19.923627-38.990507 46.62272-39.8336 79.3088-0.262827 10.16832-5.04832 17.585493-14.117547 21.95456-8.738133 4.20864-17.309013 3.198293-25.101653-2.464427-6.966613-5.061973-10.284373-12.212907-10.031787-20.77696 1.532587-52.227413 23.698773-93.364907 66.921813-122.76736C232.615253 151.852373 258.7136 144.2816 286.917973 142.687573z"  ></path>' +
    '' +
    '<path d="M883.131733 288.925013c0.29696 3.904853-0.19456 10.591573-4.39296 16.544427-6.22592 8.82688-17.278293 12.72832-27.542187 9.60512-10.274133-3.126613-17.298773-12.325547-17.455787-23.906987-0.24576-18.520747-4.77184-35.826347-14.731947-51.391147-19.452587-30.40256-47.530667-45.940053-83.554987-47.141547-17.8176-0.59392-29.416107-16.57856-23.732907-32.832853 3.529387-10.09664 12.8-16.718507 24.046933-16.411307 55.227733 1.508693 97.553067 25.849173 126.64832 72.721067C875.6224 237.37344 882.00192 260.90496 883.131733 288.925013z"  ></path>' +
    '' +
    '<path d="M488.17152 439.36768c0.003413-24.572587-0.08192-49.145173 0.044373-73.714347 0.058027-11.117227 6.560427-20.073813 16.510293-23.483733 9.803093-3.35872 20.691627-0.23552 27.234987 7.860907 4.160853 5.143893 5.60128 11.117227 5.594453 17.650347-0.0512 43.513173 0.017067 87.022933-0.1024 130.536107-0.01024 3.689813 0.98304 6.294187 3.638613 8.92928 29.054293 28.859733 58.016427 57.818453 86.91712 86.831787 11.066027 11.1104 10.8032 27.583147-0.351573 37.126827-9.669973 8.277333-23.6032 8.04864-33.078613-0.866987-6.833493-6.427307-13.33248-13.2096-19.968-19.84512-25.463467-25.45664-50.804053-51.032747-76.455253-76.294827-7.062187-6.95296-10.257067-14.690987-10.103467-24.599893C488.413867 486.126933 488.168107 462.7456 488.17152 439.36768z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-pen" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M625.648386 65.126276l-79.958076 79.249949c-44.259016 43.409672-68.619844 101.124142-68.619844 162.481581 0.017396 61.35744 24.378224 119.04121 68.619844 162.423253 44.221154 43.385113 103.006002 67.302849 165.54843 67.302849 62.526055 0 121.310903-23.917736 165.521824-67.275219l80.718393-79.022775L625.648386 65.126276zM835.407738 428.674223c-33.174564 32.528857-77.275991 50.476625-124.168997 50.476625-46.913473 0-91.006713-17.947767-124.172067-50.476625-33.178657-32.556487-51.452859-75.800383-51.466162-121.816416 0-46.023196 18.274202-89.291652 51.566446-121.988332l38.708604-38.364773 248.759597 243.780189L835.407738 428.674223zM631.092375 798.418288 188.750875 878.368178l169.577187-157.158343c17.6111 10.41521 38.225603 16.414855 60.243059 16.414855 64.548108 0 117.057019-51.518351 117.057019-114.863051 0-63.351863-52.508911-114.863051-117.057019-114.863051-64.540945 0-117.053949 51.511187-117.053949 114.863051 0 20.947078 5.745864 40.597627 15.767102 57.523111L134.850268 849.354378l47.715745-409.748175L432.790984 303.208697l-28.432563-50.197262L127.836527 403.77309l-64.727187 555.726897 611.165534-110.488417 93.603865-244.925269-54.809303-20.192901L631.092375 798.418288zM418.571121 565.329603c32.281217 0 58.530045 25.767873 58.530045 57.43306 0 31.659047-26.248827 57.42999-58.530045 57.42999-32.274054 0-58.526975-25.770943-58.526975-57.42999C360.045169 591.096453 386.297067 565.329603 418.571121 565.329603z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-jiantou-copy-copy-copy-copy-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M570.326 843.155c-21.984 38.083-57.96 38.085-79.947 0.003l-316.512-548.205c-21.986-38.078-3.998-69.236 39.973-69.235h632.965c43.966 0 61.954 31.154 39.973 69.232l-316.455 548.205z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-fanhui-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M204.048 399.211l-39.585 39.583 365.721 365.646 365.679-365.646-39.583-39.583-326.12 326.126z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-icon" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M733.73408 147.750065c-58.049091-55.19202-140.02308-85.497233-225.159086-82.97069-110.780059 3.202948-196.068538 58.379619-240.141312 155.361417-7.132444 15.70468-0.188288 34.225499 15.516392 41.36306 15.740496 7.132444 34.220383 0.193405 41.36306-15.516392 43.157939-94.984305 124.46064-117.013017 185.072089-118.766964 67.372433-1.988284 134.908596 22.653953 180.298366 65.806775 45.257763 43.020816 71.256904 109.041462 71.338768 181.12622 0.121773 113.62178-71.399143 181.553962-109.824291 218.046085-7.066953 6.710842-13.157671 12.496615-18.007119 17.763572-25.166169 27.351951-46.355771 60.22464-62.959937 97.673553-4.931313 11.113105-9.812483 22.938432-14.824637 35.08917-18.952654 45.948495-40.437991 98.029664-72.91466 125.858476-40.295751 34.530444-111.155612 38.932708-161.339572 10.035564-49.171909-28.317952-69.01484-83.102696-55.872518-154.258293 3.131317-16.960277-8.077979-33.259498-25.043373-36.390815-16.975627-3.151783-33.254382 8.073886-36.390815 25.043373-18.048051 97.733928 13.344936 177.827081 86.132706 219.739657 31.774681 18.301831 68.755943 27.249621 105.355513 27.249621 47.291073 0 93.931323-14.956643 127.810944-43.976584 43.85481-37.591153 68.379367-97.032964 90.017176-149.479453 4.799306-11.631922 9.456373-22.948665 14.173814-33.584909 13.848403-31.215956 31.286564-58.374502 51.836599-80.703043 3.416819-3.711532 8.80555-8.836249 15.048741-14.764262 42.013883-39.898709 129.427768-122.930797 129.275295-263.416412C824.390823 284.986683 791.314497 202.488761 733.73408 147.750065z"  ></path>' +
    '' +
    '<path d="M295.41008 386.93561c-17.249873 0-31.236422 13.985526-31.236422 31.236422l0 30.473035c0 17.249873 13.985526 31.240515 31.236422 31.240515s31.236422-13.990642 31.236422-31.240515l0-30.473035C326.645478 400.921135 312.659953 386.93561 295.41008 386.93561z"  ></path>' +
    '' +
    '<path d="M539.201525 386.93561c-17.254989 0-31.236422 13.985526-31.236422 31.236422l0 30.473035c0 17.249873 13.980409 31.240515 31.236422 31.240515 17.254989 0 31.236422-13.990642 31.236422-31.240515l0-30.473035C570.436924 400.921135 556.456514 386.93561 539.201525 386.93561z"  ></path>' +
    '' +
    '<path d="M340.888877 527.776312c-14.656815 9.100262-19.156292 28.357861-10.050913 43.010583 11.210319 18.048051 41.97295 48.592718 86.163405 48.592718 43.966351 0 75.110675-30.320563 86.579891-48.226375 9.222035-14.397918 5.03262-33.360805-9.242502-42.766013-14.305821-9.394974-33.595142-5.398964-43.163055 8.764618-0.132006 0.193405-13.615089 19.755949-34.174334 19.755949-19.990287 0-32.425504-18.099217-33.279964-19.370163C374.549511 523.110035 355.434152 518.716982 340.888877 527.776312z"  ></path>' +
    '' +
    '<path d="M622.556978 294.239418c11.408841 12.9438 31.16479 14.144138 44.088124 2.745531 12.933567-11.419074 14.163581-31.154557 2.745531-44.088124-34.225499-38.780235-81.689511-59.538001-133.566018-58.089-58.994626 1.505283-117.206422 31.29168-155.721621 79.68076-10.737552 13.498432-8.510838 33.147958 4.992711 43.889603 5.744841 4.575202 12.618389 6.7968 19.430538 6.7968 9.191336 0 18.292622-4.036943 24.464181-11.784394 27.13808-34.108842 67.677379-55.089689 108.430548-56.132438C560.746214 256.638031 594.625836 262.58651 622.556978 294.239418z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-icon1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M612.939947 848.148923c-123.957173 79.558987-289.647843 61.574381-393.957537-42.745547-104.309694-104.314811-122.2943-269.985014-42.775222-393.931954 9.323343-14.526855 5.101181-33.859155-9.42465-43.177382-14.531971-9.318226-33.864272-5.101181-43.177382 9.42465C28.334325 526.2127 49.858548 724.664517 174.787862 849.592808c72.723302 72.728418 170.360016 110.412692 268.555455 110.412692 70.495564 0 141.29198-19.429515 203.349361-59.255569 14.526855-9.323343 18.742876-28.655643 9.42465-43.177382C646.793986 843.041602 627.456568 838.820464 612.939947 848.148923z"  ></path>' +
    '' +
    '<path d="M950.58699 292.284903l-87.151919-87.149872 87.151919-87.151919c12.20702-12.201903 12.20702-31.987528 0-44.189432-12.196787-12.20702-31.992645-12.20702-44.189432 0l-87.151919 87.151919-87.160105-87.157036C719.889771 61.591777 700.099029 61.58666 687.892009 73.79368c-12.201903 12.201903-12.201903 31.987528 0.005117 44.194548l87.154989 87.151919-87.953168 87.953168C554.461067 180.950212 357.577978 172.97968 216.556151 278.079366c-13.8351 10.314926-16.693194 29.891797-6.378268 43.732014 10.30981 13.824867 29.876448 16.693194 43.732014 6.378268 124.720559-92.977601 301.859979-79.971379 412.059823 30.222325 110.00644 110.010533 123.128295 286.978037 30.528294 411.642315-10.29446 13.854543-7.405667 33.432437 6.448876 43.721781 5.599532 4.160763 12.135388 6.164397 18.61087 6.164397 9.55154 0 18.98233-4.359284 25.110911-12.614296 104.690364-140.935869 96.565313-337.607134-15.382339-470.041376l87.954191-87.954191 87.157036 87.154989c6.098905 6.098905 14.099113 9.150404 22.095227 9.150404 7.996115 0 15.996322-3.051499 22.100344-9.155521C962.795033 324.277548 962.795033 304.491922 950.58699 292.284903z"  ></path>' +
    '' +
    '<path d="M396.458497 486.702847c7.996115 0 15.991206-3.051499 22.095227-9.150404l21.561062-21.555945c12.20702-12.201903 12.20702-31.987528 0.005117-44.194548s-31.982412-12.201903-44.194548-0.005117l-21.561062 21.555945c-12.20702 12.201903-12.20702 31.987528-0.005117 44.194548C380.462175 483.651348 388.457266 486.702847 396.458497 486.702847z"  ></path>' +
    '' +
    '<path d="M591.018681 650.0174l21.561062-21.555945c12.20702-12.201903 12.20702-31.987528 0.005117-44.194548-12.201903-12.201903-31.982412-12.20702-44.194548-0.005117l-21.561062 21.555945c-12.20702 12.201903-12.20702 31.987528-0.005117 44.194548 6.104021 6.102998 14.099113 9.155521 22.100344 9.155521C576.919569 659.167804 584.91466 656.116305 591.018681 650.0174z"  ></path>' +
    '' +
    '<path d="M338.01134 569.828057c-4.837168 20.701484-4.679579 64.072271 26.576285 95.321996 22.796192 22.801309 52.245921 29.205159 74.534554 29.205159 8.112772 0 15.284101-0.849344 20.833491-2.065032 16.861016-3.698229 27.532053-20.360723 23.838941-37.216623-3.702322-16.861016-20.36584-27.511587-37.216623-23.838941-0.239454 0.046049-23.223934 4.29277-37.795814-10.279111-14.140045-14.134929-10.131755-35.730783-9.831926-37.231973 3.712555-16.698311-6.698562-33.314757-23.396873-37.216623C358.774223 542.575366 341.93879 553.027415 338.01134 569.828057z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-kaiguanguan" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M729.051943 259.615852 292.623106 259.615852c-126.254495 0-228.604558 102.350063-228.604558 228.604558 0 126.255519 102.350063 228.604558 228.604558 228.604558l436.428837 0c126.255519 0 228.604558-102.350063 228.604558-228.604558C957.657524 361.965915 855.307462 259.615852 729.051943 259.615852zM291.32146 684.85279c-108.611673 0-196.656939-88.045265-196.656939-196.656939 0-108.61065 88.045265-196.656939 196.656939-196.656939 108.612697 0 196.657962 88.046289 196.657962 196.656939C487.979422 596.807524 399.934157 684.85279 291.32146 684.85279z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-zhengque" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 51.2c253.672727 0 460.8 207.127273 460.8 460.8S765.672727 972.8 512 972.8 51.2 765.672727 51.2 512 258.327273 51.2 512 51.2m0-46.545455C232.727273 4.654545 4.654545 232.727273 4.654545 512S232.727273 1019.345455 512 1019.345455 1019.345455 791.272727 1019.345455 512 791.272727 4.654545 512 4.654545z"  ></path>' +
    '' +
    '<path d="M481.745455 705.163636c-13.963636 13.963636-34.909091 13.963636-46.545455 0l-151.272727-151.272727c-13.963636-13.963636-13.963636-34.909091 0-46.545454 13.963636-13.963636 34.909091-13.963636 46.545454 0l151.272728 151.272727c13.963636 13.963636 13.963636 34.909091 0 46.545454z"  ></path>' +
    '' +
    '<path d="M444.509091 714.472727l-6.981818-6.981818c-11.636364-11.636364-11.636364-27.927273 0-39.563636L744.727273 360.727273c11.636364-11.636364 27.927273-11.636364 39.563636 0l6.981818 6.981818c11.636364 11.636364 11.636364 27.927273 0 39.563636L484.072727 714.472727c-11.636364 11.636364-27.927273 11.636364-39.563636 0z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xiaoxi" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M885.68832 217.97888h-680.448v465.65888c0 50.07872 40.73984 90.8032 90.8032 90.8032h64.93696v173.2608l150.49216-173.2608h374.21568c50.06848 0 90.78784-40.72448 90.78784-90.8032V308.77696c0.00512-50.06848-40.71424-90.79808-90.78784-90.79808z m62.37184 465.65376c0 34.39616-27.99104 62.38208-62.37184 62.38208H498.5088L389.40672 871.6288v-125.61408H296.04352c-34.39616 0-62.37696-27.98592-62.37696-62.38208V246.40512h652.02176c34.3808 0 62.36672 27.9808 62.36672 62.37184l0.00512 374.85568z" fill="" ></path>' +
    '' +
    '<path d="M392.4224 450.58048c-24.55552 0-44.48768 19.93216-44.48768 44.50304 0 24.576 19.93216 44.49792 44.48768 44.49792 24.58112 0 44.51328-19.92192 44.51328-44.49792 0-24.57088-19.93216-44.50304-44.51328-44.50304zM590.85312 450.58048a44.51328 44.51328 0 0 0-44.51328 44.50304c0 24.576 19.93216 44.49792 44.51328 44.49792 24.57088 0 44.51328-19.92192 44.51328-44.49792 0.00512-24.57088-19.9424-44.50304-44.51328-44.50304zM789.27872 450.58048c-24.56064 0-44.49792 19.93216-44.49792 44.50304a44.50304 44.50304 0 1 0 44.49792-44.50304z" fill="" ></path>' +
    '' +
    '<path d="M81.5104 592.512V119.23968h621.4912c33.78176 0 59.51488 29.41952 59.51488 44.13952h28.42624c0-32.6656-40.57088-72.56576-87.94112-72.56576H53.08416v501.69856c0 48.48128 39.46496 87.93088 87.94624 87.93088v-28.42624c-32.82944 0-59.52-26.69568-59.52-59.50464z" fill="#54D3FE" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)