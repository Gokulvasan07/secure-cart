import React from 'react'
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Row } from 'react-bootstrap'
import ProductCard from '../components/ProdutCard'
import abi from '../contracts/SecureCart.json'  

// const allProducts = [{
//     "id": 1,
//     "first_name": "Gin - Gilbeys London, Dry",
//     "description": "Rekes",
//     "price": "10001000[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKRSURBVDjLpZNrSNNRGIeVuaSLrW2NCozlSsrCvqifKrG1vyznRDLQMi9TsamsUCzvSWJKC0Ms0/I2hratmVbi3bLIysRZlgh9qFGuCKOF5KaonV9n+yAGokIHHs7hhd/zvofDcQHg8j8sW0wN2FpQJuVNl8u2QC3loEDMtUX7CYrXJDjrx8u6FcYlNVE83KbciOCiNISD9MDNRHaQf3lVQZWMgwYaVNNQqcwBF1dCBbhwlIczfpypVQWlgZvQVZUPS6cag7XpOBckQIZkB9IYEZIPcee02XL3FQU1scKfM98/YOpFFb72XseooRDm9quwmk3QKXdPvdOkrltRUBG9f8A6dBeTw0bY3+ooeufZatLhToLv8IpX2CZrYnsfTtXqVP6YHa7FzFirE/ubJrRk+sM3UHlfwNSsX1YgCNG586WNKZ7SPox9mYYhLwz6PLkTx/n5+G94Bj8BT1x3ni+u3vCPgH/c4OoRbIgXhg5g3GJHowXIGANSXgOJT4G4DkBTXolnMT7oFbPxgNlo7WDYuYuCAxH14ZKTahgHF1A9CqheESj7CZK6CWIfElwrqsRI5hHMtJeBjHfBps/AUJrvn55jbiqnYCR/38JkWzZu1rchvpN2pR0VjwhimglONREYw/fATsOokANZXKDECz/UQeiWsD45BaMFPsTaU4So5AYU99oQ3Qyc1hNEagkiagn66NjE1IKl61fhdlp3I07Be60qx5TjPa9QlMwHxPdDQUdPWELrCSGm6xIBGpq96AIr5bOShW6GZVl8BbM+xeNSbjF/V3hbtTBIMyFi7tlEwc1zIolxLjM0bv5l4l58y/LCZA4bH5Nc8VjuttDFsHLX/G0HIndm045mx9h0n3CEHfW/dpehdpL0UXsAAAAASUVORK5CYII="
//   }, {
//     "id": 2,
//     "first_name": "Absolut Citron",
//     "description": "Frid",
//     "price": "[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKgSURBVDjLY/j//z8DJRhMmJQd+x89/W4IRQbY1x5L8590dzmy5PuIqC4gfvA+PPIyEMfhNqD06H+L9gfG9p33/jr23OMEiX30DTj8yT/oFxCf+hAYfBeIfwPxIyBWwjSg5Mh/tYZHzDr1D34aND7Y9tXOsf2Lg/O/z85uNjCFn908lT56eH985xXwzXvygwYUA4yLD/9Xcm+QlS572JWesP7XVyOL79/MLKci22Rc/6DXvPH+X8um+79t2u7/tOu4/w9ugFHxof8wha+1LP89NHT9iaxZIf/BCpWie7/Vi+/N/25kqvrN2Oz/suiO6QgDig6ADfgtJrX0p6TMb1u/Xd+5Eh9M4k16yCyQdH+HYOK9H6JJd+tgBv7U0j3wXVvvA9wAg8J9/6sNAvT/8gr++8Mn1MYQ8aCFIfzBf6bwB3+Zwx/8Ywu7H44e+j8VVX4hDMjf+/8/I6v/fya2OyghHHCn3GuRw3TvJTZnumq0n+4OFHi9x4nl305X5kfXDHmvwg3Qz9v9/ycDS8hvBhZxmGavmZZeHjMtX3jMMn/QW6p5+XyJxd/vW3v//7u24//XFUX/T2fr/tnlzJILVqyXu/P/HFENB5hmxw6jaY6dRh8dugwXOfQY8ux0Yb77Daj5/yTf///LBf//b1P8/7rL4T9Q/B5Yg2729v+WJTqSFqXaM81LdR8B6bcWZToZMANBzv53dt1/ZPC+XuI/SBxiQNa2/0YZmv6GGepu6gGWrkAanBqFNTxkQTTQz4+/zE3+/x+o6UcZw/93QPwwg/k/UPwJ2ADtzC3/tTM2/9fK2ATEG/9rpW0A4vX/NUE4dd3/sriU/8dS1P8/K1f8/6qS9f/dFMb/u33Z/u9wZa4iOtcdCZetANp4HxoLj0GaQeIAMa12DZDYXzMAAAAASUVORK5CYII="
//   }, {
//     "id": 3,
//     "first_name": "Mushroom Morel Fresh",
//     "description": "Ternault",
//     "price": "[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH9SURBVDjLlZNBaxNREMcTtTkonvwAHkQP4kHBj2LBngPiqRUPgpdiDYKlLYVKBRUU2psXQwNBCrVtaowbEjasocuGDRt2l112fUs2pFLroT8Pb22MNdAe5vDezP83M2/mpYDUkalxBjV6gG6B5i0P+UbY8IXmXaJpW8Q90M2fqM7M6QCquIAWvMX3Ie6BZvapuhMnB0AKJbrNbusXURdCAYqpsunfOAkgDZyjs3+RmjOD68gqbBvK1ms2vPOjAWpwhbo/zTdPYdf5jmbtIXrQjaUZFpT1A7b0CT546eOAuvMJz4E4hv4e9PpSGMUQdUFEYDug6pA3pijo18k3rw4AmhkQ92Sw1YFaTfYvEnEoIAglpNGAYl2jUFUGgM3GZ/JrUCqB0QLXk7AwgiAR+wF4vvSZbXi3ygCwYY5Tb8jSo64M6MYS4IfgBeAmYtuVlSy9/AuwLjLsKAdslaBchlYr6V0kWX1wEnHHAcuGuSWGx1isrlOucDT/UMj+PR+cJGvHlm/UtuD5wj+A9941KgoUP0KlIkUiktn/iNsdaLWhqcPj+R/DgBX3DCuNOxQKYBhSHAgJMkz4osDs4iG5WcjmYu7mrOOr/MpIM1+/xdzaNm9WD3mxDNNP4OGjfe5PfeXeZI7s5E3Gn46RXRj7/1+QK30WyPBs8XJyHvmZfgPxTEl50XYktwAAAABJRU5ErkJggg=="
//   }, {
//     "id": 4,
//     "first_name": "Brandy Cherry - Mcguinness",
//     "description": "Gounot",
//     "price": "1000[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAINSURBVBgZBcG/r55zGAfg6/4+z3va01NHlYgzEfE7MdCIGISFgS4Gk8ViYyM2Mdlsko4GSf8Do0FLRCIkghhYJA3aVBtEz3nP89wf11VJvPDepdd390+8Nso5nESBQoq0pfvXm9fzWf19453LF85vASqJlz748vInb517dIw6EyYBIIG49u+xi9/c9MdvR//99MPPZ7+4cP4IZhhTPbwzT2d+vGoaVRRp1rRliVvHq+cfvM3TD82+7mun0o/ceO7NT+/4/KOXjwZU1ekk0840bAZzMQ2mooqh0A72d5x/6sB9D5zYnff3PoYBoWBgFKPKqDKqjCpjKr//dcu9p489dra88cydps30KswACfNEKanSaxhlntjJ8Mv12Paie+vZ+0+oeSwwQ0Iw1xAR1CiFNJkGO4wu3ZMY1AAzBI0qSgmCNJsJUEOtJSMaCTBDLyQ0CknAGOgyTyFFiLI2awMzdEcSQgSAAKVUmAeNkxvWJWCGtVlDmgYQ0GFtgg4pNtOwbBcwQy/Rife/2yrRRVI0qYCEBly8Z+P4qMEMy7JaVw72N568e+iwhrXoECQkfH91kY7jwwXMsBx1L93ZruqrK6uuiAIdSnTIKKPLPFcvay8ww/Hh+ufeznTXu49v95IMoQG3784gYXdTqvRmqn/Wpa/ADFX58MW3L71SVU9ETgEIQQQIOOzub+fhIvwPRDgeVjWDahIAAAAASUVORK5CYII="
//   }, {
//     "id": 5,
//     "first_name": "Kumquat",
//     "description": "De Ferrari",
//     "price": "[1-9]4[1-9]2[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE3SURBVCjPfZHNSgJhFIa/C3AldD2ugraCF2E2OdX6c0ZtQAj7nUJoUxZtKn+mwE20CoRW4/hTTukg3xUIugmCp8UMYhs5u/M+L+fwvgKxegRCCSWUcOKO1XSb08as4dat+lq4XQBOsjXvEqBQBHg8z2upJcBJvDFmwhgfn28CRtyxvxEBzVhLjQjwGfLBgD59XrEpBoVYCBgeE4YLucste1xSplBACESjHTCKxB5dbthFx8Im/44QiPqv4jPyelTZQSeLRgWTBTCgF8k6OttobHGBEQK19hgfjw7XkVcjg8kxRnji0XAZ0+Fq4c2Q5pwSufDJh9iT+uKFbCRuksamjAxkLArqPlHllAp5NHRy2BxSRK4vRZ1PmrMDTrA544gSciZT/7pQwowbluHmfuRUutKSy2Wtnj+jSVcdCo7izAAAAABJRU5ErkJggg=="
//   }, {
//     "id": 6,
//     "first_name": "Doilies - 8, Paper",
//     "description": "Camous",
//     "price": "[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADzSURBVDjLxZMxTsRAEATL6EROSsDD+A4xv+EzJCQEiA9ccjtdBF7ba9nZBWw00k63qmd2J5V7zgN3nstSvH/8rChRBKoAwYQIlbmuwNvry7QzAHh+ekTEgICRCA4mCXz9Xo8EpWgXBFS003SjRBKp20mEqhkRJenCpc7e5FY5GliZG4UkGLogq3AxbO3EoAVSkt40Ny91NhIhzaNBWqi45nTIbI+0kLQzg9agKmv+vclGpNByFqGKqkufehfaVzkMUKXqlGC+WHED6dnHddpndUJgn8F+4iP68k4G/UgQPr+va+YkWBIgtT1vE8bvN/37b/wDV/Vlq22fLE8AAAAASUVORK5CYII="
//   }, {
//     "id": 7,
//     "first_name": "Olives - Nicoise",
//     "description": "Healeas",
//     "price": "[1-9]8[1-9]2[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK5SURBVDjLjZBbSNNxHMVXDz3UQ0892AVSs4Q0shQRA5uzCFGL5Rxqc1u5mZpNnWNN533eaDr976blZeFllc7mMLMl6IOGqdOpS4vAPaRbb6FiQjpPm5QahvmFw5cfP87nezgkAKS9JI4+zp5Wey3Ot57AnMZ9rYnn0RAV6HHoz/+eZl74SYq12d2x0OaGnapL9azeF6CBeYxY6PSHrZeDH8OVsOmCsaA9BYva8/u+AKroo5V2cy8Wh1RYMz/D8nsV5id60F/sZ90XgBoew51pydxYmuyAY7YTKxY97AMEihKu6v4J4JK92Ep26CLBIEPFoqwl033HCGHqT7uOj69dhbAbcjFY+wAXOOd7AgQ+R/4CMIPPUJTsMEd1PBk71SjjQV4nQYUiF/lSAbo+tqCkvwi+eec0F/lnD28BZPRLg0+Sb6Gz4B5m2sRo5dNAMCioTQpDk1kM9bgQVaYMlJsy0f6pAen6NAQlB6i2AAq6Z/uXfu2uwrTZZMjGH6HCJEDxaDpyRlMg+pACtoqFOVXU/wurKI6GYkKEfMN9pKvjwK26ibjSUFAl12B7GrENOHi5RqQQpe0qzIeWBW5dDArb2ei2KGG2GSF7lwK6zBcMoffrTfOB4OeJVL5peeAbUPpSh9xGLQSEBvUjqxAo5hFfcn29a7oaXTMEXCPt40DWl4TAVLdVknt4LY3G614xzDogmQE4I0DCABDTDdC1ADEEROT4ocdSj51jmFK6ACBNSfzXxzrk4L+yg9kLMPUbiNdugKZxIFINRModuPLwNB4b76LMyNo0l71lbSew1oTYOkoyEJs3DK4RYL9xJtADDANwx5WifA6xvCjclnqj0pi4edm1XW8nQEr63JwU1FNEzQ6ktej900dBzptyahpk8SRCsk3wvPHCKs9KLEgQehuchiVX7N+73NXfL+Zkqi9OGtlWAAAAAElFTkSuQmCC"
//   }, {
//     "id": 8,
//     "first_name": "Wine - Gato Negro Cabernet",
//     "description": "Entres",
//     "price": "[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMoSURBVDjLndPLb5RVHMbx5515pxfnnaadQi9MSykzRSFSqyWjITVoUIMhLmClLky6YcempKBGgitDJEgaIlVjMGkkLkCqIUTjyo7YQs00dYYZpsNoufReaWn7nvM757yX4wJJJBoXfv+AT57NY2it8bBT2fct6aoeodQeoSgplISQYpSE+i6onv2gWr9e/tEbMY6/ZTwETmaO7ZKO+uKZ6q7WoFkBx/BQV7keN6fyuJj7qj9mfJJVjturlNf9+YH40CPAiV+P7tsYSlysDW/AtLqHcTuPoA5gp/U0zl39bKnS3ZeMGC+NJhNWNHdrFbdn7f3nD7cPAkDgw/GjUaHEQJ21EWN2Ean7I7jvrCBR2YL5ubtgjN4L692HttRVROtrKtDWaIFIDbzy9nAUAAJcUk9n9S6rRFPI8wlwV2B9MApLhPBN5sJ4LHj6miDnQKI5jMKMQLSqHG1NEUtw6vkLYHuDoXJk7QKUK1EVsNBe9QRGiz+D1sRBR5p9HZsjQeX4mLqnUJyTaKgNQ5DYCwAmJ7FNGi4CMNBhPYlN5THc+b2EdCl9tjUysIFIdsZqKzFS5ODMA1v1sDUWghTUCgAmI071FevKuiI7MD9zF/1jJ5ckU33Hll87M7GSNn8IP15aWBbbTRjgzIf2fUhlQpEIPljAafKXG8Mdl64PLkqSxw/PNp3fvRR+S/PcxPM8/cKlbb0Q0gPnGsQ81NaEML1gQ0kqPQAYfflt5uv+U1Ntl7esBHs0p7yzudkyir/BX7NBRODCA3ENYbtojj+G4aslOJIuA4A5WOo4qzkd15xOO/GWMifeAt/zYI5lAcYguYSQHoiAzu0RFCbnkcllbM9RfQBgapuZPuNvqp3JMremGuJGHqHGJvg2g2YEKThIeEjEwigUp1HM3YQrRffs0JFFAAiEPj6z6K+xbuNaGsgVEGpohE8cHhE8ElAksMocXEll8FMqNTkzd+vV2aEjF/7xhbWuF1/WQnyq4pta3fp1CPw4Ar3wR/tzO9455ylJrqu+91x1Yj71rv2vZwKA5a1PWZ5UvVqpPb5yktp12xuWZrL4jx4B/k9/AolT0+iTfsOYAAAAAElFTkSuQmCC"
//   }, {
//     "id": 9,
//     "first_name": "Rice - Brown",
//     "description": "Cushion",
//     "price": "[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAL+SURBVBgZXcHPbxRlHMDhz3femdkunZ3Zdrublgptg7W0aig28SAYk8aDUuNFjkRvhBMHNfwL3vGgQcWEGGJiTCQxgjFoECTUqG1AKZj+MqUUum1xdmdnZ3dm9tW1TTQ+jxw5+vLlQqkwqZTiv4T/E4RtAiRpi431jW/NQqkwefb0x4ghJK2YfwmCRiO0hXEACFob6JZGk/L2qbcmTaUUKQkSn6f2zQxdl0PKp/bSmXO4e/c6c7Uz3C/75HIuDzd9lGlRqUW8cURjmQqDHb6/iT9qUwkCwku3CYI1giBAGjM06lXqYZVmPaBeD0iiGiItQDCFbZ5XBB2z62Q3vPMLmdd6KPXtJhsvUE+GyeVz2MrAtGyCMEKkAQgm/xB83ycIqlDKEnUlOJ/Nw3MtdHiVuHGYsGpQbF7hQOUiynma2oUr7Hc7MNnheSXQMXnPxT8xRtf7myQv9JHpabC3uUlB/cqAeZtszzG8oYP8uTTCMxtnMUFoi6IGtSBERFPtTFFPQHRuEf16gXz9DMN9wzj9h9hamMOWJjm3l+6exzCFbdlsHset4bkubdaxQbJvXkNVFaO9Q3hDL9JY+xR7l/DH7B2SluKTuRhD2Fb1awRBA79S46fVB5xfWOLmwS2ypou3b4ro/geI9QjLydERLmNPTFGJFQYiCODme6Ejz2yYsNy0KFYfMXZoHO/xV4lW38OwYpqVQcrfTXPPKGIUB2gz+ZvWmumVJWZW7+A4Oax784w4g5SenKL54EOUrYn8Ada/v8GP+0Ypd3YwZWdoMwUIkxrlNCZjO9iLK4xnR0haJdZuvUtXySba2sPG9Z+58dQE2uuis9kArWkzQBAxyOHiSA5rfpmxw8fJrFzj9ws/MPv1Fje/uoq7uBvD7MTGwsYijRMEMJMkJU1T+rvH6S/A5x+do/nblwwdeB6/vMnKrXn2nzyNld3DhIpRHTbKUKStlCRNkVeOTl0slnpeUpYJCJXZLxgfLPLs6CDlljC9XiDUGdqEHQJJklJ+WL70F3VJO/3fH/GfAAAAAElFTkSuQmCC"
//   }, {
//     "id": 10,
//     "first_name": "Milkettes - 2%",
//     "description": "Ditzel",
//     "price": "[1-9]7[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKtSURBVDjLlZJvaNV1FMY/vz/3zrt77xjs7s7mVZNS3HAuFIWwXpRWexEYDANFKQpfyagE8Q8iUfinKHwTFL0wzBcWMWjpCxWJJQ6hHGOSNtzcTYmma7ipu97tfs85X1+s1DcmHnjgcB54zsNzTnDkzPge79ms3gpmhhqIGaqGmkfUHoKi4lGz3/ZuXLgSIDbvO9pXZnM8QX34/dDS//pYzXIAXcOHERNEBWeCU4czoTFTIFedpy6V48TVn9jSsgvntOohAQ/AhuZ3H7v5+JVOvuz7BCdreSCgBsDRs6P3hw21SZLZv+gdP0Hx1gAiijhlTrpASe5wu/pb4DMAQvlXAGD9C3miwDN/3ii/jneRiVKsbmxjzdw2Xl3QxuJcE00Nzcyum2btV68NAcRODfOeOILOc6NEUcjp4R6qqaa+Kk//jT6Gx67gKo5CzVxEhMGi0tVx8lmAUNXwQBwFtD+fJw7h77uX6L/Rx7HLP1KZCjn0xnccebOTcmkaK0ckJzfx8oFVqfsOvEEcwvHef4giePvpj8jMiggCuHmnwtDIXUSNFDk+eGUnW4b6+HlHTxkgdGJ470lE8PryembFAQvyKeprkuSySeqySX648DmLCxn2t39MGISkq+IHVxCbCTEKA073jwEwOFIim4JEmGDfqe1MTE5weaQEwKddHfx+/Tyt74sXJ1dDEZnJIIQ1rTniCBY+lWZ2bZqD3buZsttECeWdr19i0xcvUmKCDe3rWLFsGa4iJ2cy8J4l8zKM3CzzTEOK4vVJdh17i9psDa2LWlBTlixqRr1iXhksDvPLmZ5eFT0abD106aw4fa6ilnaiOFFUDKdGIvsNUWoCEeXiwB9IRRCnhDSOlaf+XFc8fK0b7/3/Yvm2lu6l7zVdeBQfPu7/K9NutavIwKP4e594fYOHzxflAAAAAElFTkSuQmCC"
//   }, {
//     "id": 11,
//     "first_name": "Sour Cream",
//     "description": "Burkill",
//     "price": "1000[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKbSURBVBgZBcFNiFVlGADg5/vOuffOdcb5cbKcjUn5V7poFJEiKMKybDYFgdSmKAiiokW1aNHSXWQQuGwR2KJFq2hTkFqUEbZRMzQIJS1nbPxjnHvvOd/b86SI8OSHx1/uT/ZeyslujCGBhEhE0ZTy5/Vr8V26ufzeiSMLQ4AUEQ4c+vHE52/tfiDnNB1UAoAICIu3R47+et0/FwcrZ0+fW/fDkYUB1JCrtK1bV9NnrqpySiSi0EbRNOHOqPX4lrX2bq2dLItromxffuzNr2eOffrsIENKaSIiqm6VdTJ1ospUiZTIEoq5ya6FPXM2be7168nxz6De+c7vhx+a39h/48tF8zN9nYqfrtyx956+4aj49swVMxPTtsyuc+9EpdepbXp41rGf/3oBL+ZmEKfunqiNBfv3TDl+acXqMDyxa8rlxaEUvH5gvQvXkpMXG9+fX9HrVFKdG8iKX26sFM/vGFen7PbSsq29WpWT01eW7Ns2Z02v0utWxrqVsW5HyKQM6mht7lX8duGOj7+5ZPv96y3913r/i8sU9j86Y9QGKUttEjkURAB1jMq4YClluWV6NUlTterSooN7N8opqasgEkFI2kJbgBxDvWiTs+evOvTKg/qdZDgqbq0Uj+yaBEmSIqlzUuVkrJO0TYC6jGKuSnSa0O9mf1weuNHe9PTWDUqEErSFQAki0amyZtiAOrVp6tz5qw6/ep8miqlOdnG59cy+WSWAKlOhkxMoEUaDAvKFr3Z+MBhdX51eW4PXDm7wyds7AAAAQJQwWm1AhmZQSlNKAAAAAADUdS5NWxqoYbTa/jvere6SRuMRkQUFMNWvQQT9TpaS0qnSrbYpf0MNKcVHT717/LmU0nyINQCCQAggwGop5VSdHYX/AYn4JwmEykruAAAAAElFTkSuQmCC"
//   }, {
//     "id": 12,
//     "first_name": "Carbonated Water - Orange",
//     "description": "Elmar",
//     "price": "[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALDSURBVBgZBcFNiFVVAADg75x777z50RmdDJG0phpTIwq1cqP9IBqlLaxNpYVSVIvahLVLCqFFoGEZQkQhgdGilUghaqRNIKgUZEmQlCBlmmOm772Zd+85fV/IOVuz7ejmgeHWxhgsRz8CCMiBnNQp/Xbln3w4XJ18/die9dMAIefssXcmjn326vIlMYZZmUIGIGfILl7r2Xfiir/OTbV//unM6Hd71k9BCbEIi/rKYtbpvxUxBAI50eSkrrNOr/HQwplW3FE6ni4O5rR48sFXDsz+dve6qQghhBk556KviKpIGSgiRSAEooBk3nCf9ffNMzbeGiiHhz6F8NSO1WdTHh2bNZhCk4Nl44+7fP2Sb37cK6NVzdCk2rplz9j0wEtaVandnbbpvZP1wbdXVSVOvfzI5ls7rT/9fvmMUyf3q1PbsoX3mG5q7XZHMmp8wdOOn6ulNG3VbS2hjDVEbPzw64PNDXnc8NCwRXfNU8ZBl65e1m53lcVcW9a8b3hoRH9fob+vkkVCBPHz1w5NtZsne19M7LVkYLWZ/QPGF92i2+mq69ILa3caqFqqMuorCq0ySsgZiNBuHy6+//WIXQe2u3/OBk3ZceeSu031Jp3+45CyoCqCMgZlETWJJgHx3jduevFa5+NqxeKVchXs3P+WRxc8a9Il88du99WJDzy/a0zIQRmDIgb9VdDUGURsI5s4fcQvZ3/QmW58cuQjT4w9Z2TmbKM3L7D01pUyUiajKqJ6ugbliXfPz3/4zYnOvq3L+y9eq8C/1y/4cmK7691JIUQjgzeqIlUMIOWsN5VACXXdaBoARobm2rJ2NwAAgJyyXrcGEeqplOqUMgAAAABAWcZUN6mGEnrd5sJQXzFH6A3lnKNMAowMlCBnBqooBKkqwn9Nnc5DCSHkHWu3Ht0QQlia5UEAmYwsAxl0U0qnymgf/A8eWStYAg6kAQAAAABJRU5ErkJggg=="
//   }, {
//     "id": 13,
//     "first_name": "Ham - Black Forest",
//     "description": "Maingot",
//     "price": "1000[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIlSURBVDjLpVM9iBNBFP5mf0jIIsIdMSsR90L8iwfWlhaiaCHBNB42ioWg1QmChYiFXG8l5LjiIKCxMSg2ewQFlRQBc4iIiIoJ5kgMJCTh8mOyu743sF70Llg48PFm3rzvzffezAjP8/A/Q5tc5PP5ACU8R1hwXfcI2YMEmrrvyX4mu0LIJ5NJx+cIXwGRj9L8YTgcPmaaJgzDQCgUAu+32210u11UKhU0Go3X5LuQSqWqksgBDNu2X5TLZT7OmzZGo5FXKpW8bDa76vMUXwot5iORyD9rjkajoEPObOsBOWXGer2OYDCIQCAAXdelr9frodlsolqtIh6Py9ipCTRNQ6vVwmAwkOvxeIxOp4PhcCj32LdjAr8mVVWlAg5mUN0yid9sJjuOM10BB/skIYQM9n2KomxToPydwCcweM5gsnj7DFi+gk+X4zBzN2ftU9qtHRVwMIOJXA5bt5jDzI8iDl+8jkBsHv13tvLh1dq9tZP65h8KGJOn+3IHbx7h0InzCH55CbG6gNDXJ5izZlVPeIu/FTCBr4peImq1Gvr9/ladTbpaMwacvbHVvLt7obpibrKES4VC4XEikTAsy5LvgJso38YeE7315zCeXsOwX0OP4rsdKk/Fhpj8jZlMJkaJbhNS1PHd/Be4HL2Uw77WOvbP/ISmfEe3Mca3uuqMBt4dMe07p9PpXUQ+QHCpqR+PF+8vbjY3rqqOsBzVqxLrwWl7vPQLOvKpkCFdDpkAAAAASUVORK5CYII="
//   }, {
//     "id": 14,
//     "first_name": "Veal - Nuckle",
//     "description": "Bodycote",
//     "price": "[1-9]5[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHYSURBVDjLjZPLSxtRFMa1f0UXCl0VN66igg80kQZtsLiUWhe14MKFIFHbIEF8BNFFKYVkkT9GKFJooXTToq2gLkQT82oyjzuvO8nXe65mmIkRHfg2c+/3O+d8l9MBoIMkvi6hkNDAA3om9MTz+QAhy7JqnPO667poJ3GOdDr92Q/xAwbIrOs6GGOeFEVBtVpFoVCQkHw+j0wm40Ga5k4C0AXTNGHbNsxv32Hu7YNtp1Cr1VAsFiXAMAxQkWw2ewNpBZDZPjiA+XYebioJ9nIKqqqiVCrdGUlm0gpwzs5hzrwGX1uGMTMLtvrBG6VcLstOcrncPQDOYW3tgCffw0isg4uqnP6J8AhCnVAelUqlPYD/PYE59wZ67BXsL4fg/6ryYhNC82uaJkFtAdbHT+CJFbgbCagjYbDNlDev4zgyH4KQ7gA2n/fMUWWeiAtzBMrgWABAXciAhaibAKAYnXyaGx3/5cSXoIajsH/8hHP8B87llTSSqAMSmQMAfSL2VYtET5WRCLcW3oHt7Aaq+s1+eQAt/EJXh8MNe2kRSmwa/LoQeOsmpFUeQB0ag9I/jIve0G/n6Lhx3x60Ud3L4DbIPhEQo4PHmMVdTW6vD9BNkEesc1O0+t3/AXamvvzW7S+UAAAAAElFTkSuQmCC"
//   }, {
//     "id": 15,
//     "first_name": "Asparagus - Green, Fresh",
//     "description": "Sweet",
//     "price": "1000[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKiSURBVDjLlVJbTNJRGOehXtl6dD20tbV66cGtrfnUU7WW09Sl3TRsokucuGGZInIXRRAFEQhMBNMCUkEDuWiKrTC1uTJvqVQP9dZDDW1p/TrnT2u5XNbZvp2d75zf5fvOxwLA2i2aJuoTqjEZe6e7XcHqqCJhnWmHclSCumA1+78IGsblidszbQi8G4R5yoDaQBUqfRXsfyIglhOWaQr2wbXihP/NAPRPNBB4y8FzF7P/SlD/SJowTxsQeOvF/ddOOBatqBoSYCjeD82ECtddXBR257N3JFCOihOmKT38BKyeUEI5LoF9wYLOBTPuLnXCF/dAGhbhiv3C+h8E8pG69fZnrcSuF6ufl/BlawO9s91QjNUlwWseSMJCXOrM3dxWgmGy+ZAsIvpqnGxhalVHlQzYFDUi/nEVqqgM3jU3xCEhVUZ+10Xk2XL2MASGSa1IRiy1xXQM+N6yg9gWM8oULB+WJMHBGqqM2IfHqB2+hWxLhoIhoJYMsWY8JA3qXe5iar0zb4Kc2FaNyzCw6oYoWA1eVwEE5gIUN2eioPEUMhpP4Iz+5D6WYkRsJwHbcxMG4w9QOchHx6t2OBc7CNjFqPG7CyF1F2JozojZ9yHowqXI0x1FWsUBJ0sxKk6hLuiQmKZaGbuOBVsSTHJcDwcc9Wl4X7bAO68HXZoIF7pICY7zUjaYJtb4b1jtMzYIfHzon2rRv+KC0H8T561ZEBKSdGEq/HM2/L58L4yUIPkVlT7+YWm4diu8FkCZpwSEEFnmjO+k08M5lsyatLL9G02ha1CFOAxYFeRsd1DeV7qXTFc/t4fzjd/HwzlT+mauLfsY6fRBek8eKnI0R6ANFTHKdKdnktf8GqKiHk7qVcflafJVZ3cab/K4gcQnavvn3kDzPwBTBMCdhxN/5wAAAABJRU5ErkJggg=="
//   }, {
//     "id": 16,
//     "first_name": "Olives - Black, Pitted",
//     "description": "Daintith",
//     "price": "1000[1-9]9[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIsSURBVDjLpZNNSFRRGIafc2fGP3Iaw58SSVyYJRHGCJUVtGldJLZoUS3atIqkdYStwkWLWhjiJghCpIWRLSKMQENFC/uhhsixn0HLTFPn3uvc+30tprlOIVH0wuEsDuf53vc73zGqyv8oDHD6+tPzQC1wAIiDKopBFMsyWAZEBPFZiIT1bUNNtBlRLrRuN6gqp65NdOs/6krvK1XVrAPgIEDP0Hxg7U/BzuzfxOv3C24QAdHNucP6ykIAjFn/8ptZFwDbyRQEAFUtyVVNfHb/qnnq+2YNIBrOWVtPK19GWZweoGpXO6GCaNa0L+QDDEDbpYc4IojCvcuHmUotgjjou9vEqltITvZiVbdRV70RFR8AKwvI0ubsDHt2VDFve0H1yMIg0co40S278WYeIctT2QjeL4Bsz5ccn4wqaTcLUDvFyvQApeUx/O/9VDaeYDXZh4qHiLcGMD8duG4GO+PjOxlQJfOhn/L6I+BMMHrzFhtiNu6nERanh1FvNc9B3qvnJnt5ZoJCWaK0LI24U6CCvzxG3aF2Pj65QcSk1wDiSUC4P5QkbITUWA+xrU1IehIVm3hrA7KaoqgoQbRmL83FYxoAfJEkwPOuo7zoPsaDcyGKyuopKZ1Dva9gQozfSQCCOAkqttXSFBnRxx07G42qcvzi4FVV3aaq+xApO1vRScvJLkJWEvW+/TbYFqHiBmZfPiNxt6PPrPedhzvjc+pLiYqiInlLgx0RVHX8BxTzXjKQ0/OBAAAAAElFTkSuQmCC"
//   }, {
//     "id": 17,
//     "first_name": "Spinach - Packaged",
//     "description": "Ludovici",
//     "price": "[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMsSURBVDjLXZNrSBRhFIaHIIIyu1q/+hdYJBVhJUmE0EWiC0U/ukM/KroRllGR1S4UWVnZTdJMS2ujrbZSK7ruNK5rm+m6bV7WNbfc1F3d2d3ZcUxH7e18k1k08AyHb87zHuYwwwHgOp9yQwgd4SA+EMPY+b/Q2cSB5zYi9s85FzJxQ4kznRUbvqsBM6SKjX5b0XJL6muVJ8QB+PdFq4SIfUegqzZNpH4bMUkL8N/ljki2TS09vqfoKN8S+micJ6dbArhS4ceN6jYNVp8XmlBtnKWEnXpFrt7fTl4lMZTz3uSORhxpoq90S8h6e17vpfJm3HO0wiB8RZapBpfu1+DmmyYY7N+R986MuqIl/V3e+32+x1Nd5MZyX7K5+fU5w11ludOVM+Ym3LU1w2T2oNErISDJ6JA64WqWUPiyEXmlHtx7kgGHIaG7Nie6itxYbRGpN4rPHnzoRI7FAyNNY1cwHEZDSxt+UM2QfwLXShqRxbtxzChgZ771pLYDdtuQXckfeODEtecu1NJkpfcnZEXB1bx8+Cko0t2Nhy/eQmgI45TxE1gvcwYD1mQKYoqhCqfvOODvUhHs7kcPPTis0+O26QkOHtfjpdUGZ1jFviwbWC9zBgNWnHoubsu1QZdvR7OsUkg/vOEITmSc02TB/gkdvcDHgIo9meVgvcwZDEg+9oBfe8EMfWEl3rnDaKWX9kZUPOPL0CRK8PUBHgV49DmEfdnvwXqZMxiQdOCWbqnuMfZetyLd6EIHLSyoApF+guoQBUjr1kOeMAFSTAyCRGD8eLSNG+fRAhL3ZMUTNYuPFiMlW8BpYz3snhBk2oesqHBQzURl9Wp0rlwJadkyhJKT8XXs2L/f+pytGdt3pBcqCw89wuaMV0i5LCD1ogUpF0qxO9OsTWSiOHMm2uPi0J6UhLrRo/8GWK3WJKfTiTdmoS9xVy5m7zZg7l6TBqu9NE1ctAhtU6agZfJktCYmoio6+rdcUlISQ8hutxtFxcXijPVp+ri1R3hCHIBvGDMGvgULNNGbkIBv8fEoi4r6HVBQUBBF1BM9xLT/f2WGc9SoOjaxYuRITbQQ/IgRwV81l9Ohf930iQAAAABJRU5ErkJggg=="
//   }, {
//     "id": 18,
//     "first_name": "Wine - Duboeuf Beaujolais",
//     "description": "Dow",
//     "price": "1000[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIMSURBVBgZpcHNi05xGMfhz/07hzTDiKZmEmLYeM3iKTKUiFhY2EhZ2NjIBgsWYoUoSWr+B7NhY6GkJBRhYSMvJYRSFDPPi3N+9/01Z2Jvcl0mif9h+46PH92yrXXpe0f9EhCBIvBwFCIUyJ2QkDsewcDsuv3y5adTN67sHytbo61rs+b0p6E5zER/u+PXgLGyUyt1vk8yU91aiSmlXJw/uJKZOnzxPY1SChpVdgQohAcEIkJ4BJ6FZ+EKKhfLh+fh4TRKJBqWDJNQMmTCwkjJMEuYOVaIIhJlFo3ITiN5OI0EmBmWjCIZqTAsQZFgVlFw/tZuTt/cjIqaRnjQSAoxzYxGApIZKRlFYRQGKcGvXLF4cBXHxjdS5R4RTqOMcP4yM6ZJnLy+DSlTRabKmUULVrJqeCMTvTZ7x0ZYoKs0ylzXTDPDAEmYGTkqdq45hCvwcALx+cdH1i0eZbLq8qx7iPXnDswv5UGjAMQUM5Do5QpX8P7bG+rI5Kipvebnrwk2LNnKZN3h8bsH38qI4C8DjClm9HKP7JmhgaXkcFzBlx8fWDh3mOcfH/L47Qs6Tsv2HR8fH1qyaH+4Ex64OxHBz8Ej9KqKKip6uWLF4Go2jezi6YdH3H/1hGXdE7fvXD6zxyTxL9aeS+3W0u19917f/VQFOz5f0CummCT+xchZa3sUfd3wka8X9I4/fgON+TR7PCxMcAAAAABJRU5ErkJggg=="
//   }, {
//     "id": 19,
//     "first_name": "Cloves - Ground",
//     "description": "Duxbury",
//     "price": "1000[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALMSURBVDjLfZNLaJRnFIaf779PMuYPmSSjCUmYKBXREBLwEhUXIm2otlRBN1WsIoJLRcRdN0VEcKWgC1trV7pQBHGjokKrYBFNWsQk2gwpphNzGWcymcx//T4XIWpQ++4OHJ7zcnhfcenGk9NSiu9nA+n4ER9LLRxNAxyTiwe+6z4MYEgldm/b0NLgOI4QQuf/5EmIo5Brd1/+AMwBZn1p27Yjfrv/Bo8pSmKQTHqchFkkUpL8dIJnL12q1AoMUhzdmSGWQsxDjSACTdPRBATaGJn6cWxrhKJfIoojDNumvWUJ2eFqaq16pFzoygCQgKYJfDWBZb6hUCnixx5BFBGpMrZtU/YTpBIaCrXgMe8BQqAiiR+HeJFPJfQJZEQsARGiZEy79SeFmz/yVbLD7f/luBLe6F4DQKk5gEMDpXIOpZv4skwQxZh6gnIpydq6SXob8yTqd+NmuihklzNw68Kp9wBNkNSbGR17jevkqKrWsEXETL6KVGmGXWvqqXG7yf/zHEsELKpZTDLV6hrqQ4DZSFOii1dP71Gb/A8Rx2Rsm+2bV1PbvgU/dxmrSjDSN0DoBVNeZWb9OweDUweJpSSWki/8CXpa2hBmkabOLtylX+ONnkezIsxkG5qXVeG0t2X1kdtDhlIKAfTOBQsAvaNAYfg+y5qW4i77Fm/0HJoZEUxnmHzQx6Pq/eU9B3b0AWjiE3n1J4dIORaNK7cSjF1AtxT+dBuv/3iM3XuWopWJ53c1xxRFZEhneh2di3tY9O8r0pUioWwm9/cZJB7lfDOTjwao++Ycdk0KQxfvLhqWIa5cvTfcE8SqQylIZ391dx76mcHLRxn6/SF2aydePidHWg/Plh8UYkMvYGpcmgcIpRba/+ngqvDY/kMGWkzfneuMZF/MuA11G7880d//qYJ9BNi1qa7S3Z421qzIoEz/YWV8Yt+2k38Nf66hbwFu+Dui0xbh3gAAAABJRU5ErkJggg=="
//   }, {
//     "id": 20,
//     "first_name": "Parasol Pick Stir Stick",
//     "description": "Cottell",
//     "price": "[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH4SURBVDjLlZM7i2JBEIUd4/kJu7D+g4FZxjXSRFHQwMBsMxFFE8VEMVEDhRURRREDTY18pAYKirHJBAui0YJv8fp+jme7mrmDjvtsONzuqq7vdp2mJQAkbHxgemR6+os+MUmpRpTkFfC42+2E4/H4cjqd8CuxPJLJZPw9RAQ8UfFqtcJ6vX7TfD7HbDbDcDjkkH6/j1QqdQWhcUcA2rDdbrHf7/mXtFwuIQgCRqMRB2w2G9BPMpkMh9wAqFgUAahgsVhgPB7ftPTqyd0VgLXxtoHm1LfYymQy4Sfp9Xq/B7zXJYROQn5Mp9N/B1xCqB3yhED/BSAdDgfuC0FIfwSQy5VKBdFoFLlcDpFIBJ1Oh3sgxuhrMpkSCoXi/uYas9ks4vE4BoMBut0u6vU6X7OrQ7vd5rFms8ljer3+2xWgVqvB5/Oh9fyMcDgMg8EAi8WCRCIBr9fL5xSjHEHcbrdwBYjFYgiFQhxAzmu1WlSrVbRaLTQaDRQKBR6jHAGCweD2EnDO5/NwOp0cEAgEoFarodFoYDQauWhOMb/ffyaA1WqdiW/hM3N5zXp8sdls9GhQLpdRLBaRTqfhcrng8Xj4nGKlUunMzF2wdr6LgI8EkUqlX2Qy2Vd2zJ7ZbN7Y7fa9w+E4qFQqv1wud7D1mmKU0+l0P5RK5cNPtqSTQgo+48AAAAAASUVORK5CYII="
//   }, {
//     "id": 21,
//     "first_name": "Kellogs Raisan Bran Bars",
//     "description": "Lies",
//     "price": "[1-9]0[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFWSURBVBgZBcE/SFQBAAfg792dppJeEhjZn80MChpqdQ2iscmlscGi1nBPaGkviKKhONSpvSGHcCrBiDDjEhOC0I68sjvf+/V9RQCsLHRu7k0yvtN8MTMPICJieaLVS5IkafVeTkZEFLGy0JndO6vWNGVafPJVh2p8q/lqZl60DpIkaWcpa1nLYtpJkqR1EPVLz+pX4rj47FDbD2NKJ1U+6jTeTRdL/YuNrkLdhhuAZVP6ukqbh7V0TzmtadSEDZXKhhMG7ekZl24jGDLgtwEd6+jbdWAAEY0gKsPO+KPy01+jGgqlUjTK4ZroK/UVKoeOgJ5CpRyq5e2qjhF1laAS8c+Ymk1ZrVXXt2+9+fJBYUwDpZ4RR7Wtf9u9m2tF8Hwi9zJ3/tg5pW2FHVv7eZJHd75TBPD0QuYze7n4Zdv+ch7cfg8UAcDjq7mfwTycew1AEQAAAMB/0x+5JQ3zQMYAAAAASUVORK5CYII="
//   }, {
//     "id": 22,
//     "first_name": "Ice Cream Bar - Oreo Sandwich",
//     "description": "Bordis",
//     "price": "[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAITSURBVDjLpVNLaBNRFD2TjIq/TdGM0OJGXPhBFENq0aUrtQYJCJaC4GdZxI1IF1XBdiEuXSooBNKKisXfTkGtFqsIdmOxdaEUaSIlTtp05v2u902aTgIuKr3wuOfdee/c88685xARVhJu/k25jznOazJtxhhoAyibtcUExTkeGloR181Yf/f2TERgiHpymY2b/qfr1aHJPUsKmC3aPPz9HndW3EVBcpZaxplr9W+XO/ohpV7TQFDzoGvn2WV1nw+YVOnYA3tWG4W3xWURHE+3QDQSqEUCG6cOpXB/ZAYnD3pLtYejM8gdiOe//aBZgWQCNhJukhe/LyKZTODRaBFOAkgsLhr+wOp4zSoX2NG6DkLGBAl7BOuCm3SQ60jB5V13P3fjRCaFLA8bNmfbPRzZ79V+rTLNCojnduPTTyXc/tgFJVSEH09fgBQSD/ISYRAiXBAIqiECxulLgmzNlcxmb2NnejOO3TqMLS0eS5S48bwTSipcPzPAXTWqsoo5OYdK6KMifMbzGMwPwekbnKKLR9swNuXDYUkDL7LcVeFK9hnujJ9r7lytYVsTgYzUoTc/QbOVkF5+KZGNV+Mlau/dR/VgY6kxvv4o0+mb7yyMlNc8YLB76wb8ml3ANm8tCj2vMTntR4btal2NiZ9/mu6CMWQaLhKNXCt82yu0WW//rx2afZHR41H/vEzlSvCkjp2VPue/lFt5YsuGFGsAAAAASUVORK5CYII="
//   }, {
//     "id": 23,
//     "first_name": "Meldea Green Tea Liquor",
//     "description": "Munn",
//     "price": "[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH5SURBVDjLjZE/SNRxFMA/7/f9eadWnmGBIl3fk1oKGsMh6KA/Bw5CUzS0NbVlkFs0RATh0HLi0CDUEmgQtCiBJA05hf1Z6pQT7Wqw4C697s7vew2BKYreWx7fx+PzPu99xcxoJvL5vFUqFYaHh2VrPaLJUFXm5uZ21OOtj7GxsREzy4pID3AEaBERVBXvPXEc7w2o1+tDuVyOZDK52RxCIISAquKc2xugqqRSKc5OHKYtVqoqgHEo0WC8/8f+BnEcE0JAnHHnvBBHhgAj8zHluu4PiKKIRqOBREbCAWZEgDgDozkDVUUc3J0FExABBMzC/gDnHKrK8zMfUdXN44UQSLlU84CJylOSySSZL6fo6+uj6/ET1i+lGVie4PWFUQ3OloH85amNh7sCBluv/puc+Weweu4onQszZG/cJpk5LdX5qWOfZ6fvT19sWYt2u0GhUEBVWVxcxMxYe/OMk9krtBZmkPFrtC+8wB/vciZ2a4eBmeG938whBBLlVVq7MzAw9H/YvR6cit/xjapKqVQinU6ztLREb28v5Y5O1t+/4sDLm9Sq31kHKmVHcHzbtoKI/K5Wq3jviaII7z2JRIJU9jqf3r2l9KeNsmvh10/h64oEg/w2g2Kx+GhycnKwVqshIlvB9FtH94nih4PtDesILloxbDQ3tfHgL9Xv6UA7GgE/AAAAAElFTkSuQmCC"
//   }, {
//     "id": 24,
//     "first_name": "Spice - Greek 1 Step",
//     "description": "Edmundson",
//     "price": "[1-9]6[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJDSURBVDjLxVNdSFNhGH7OD3NmuaVnapg5lVCJKINWlBJFYGTSz0XYReHFIJFdehEEFkEF3kd00ZWFXSlIYgyDRlsLJVkbEgu3JjpxZqaOOde+8329ZyIs6kLwohee873fy3me73nPeT9JCIGdhIwdxv8XULeS9j6/jZZ+zvlhrnOTznRsgpkZY1k9y6bo+XDiybU3/xSg8Dc3aHVH7XvJlgSdczAOyoBfJBSNrza/GP08QlvlLwE6fbcqo868PIUBzxecae9EcNyDrC4Qn5mG48JNRP1DWAyFqeXrf7ZA5Aqy/bqpthSxoA/FZXaspRlSGwwLs1FyIbCaYuA6UFlWjKqzPaJAqw9Te5e/DXWFpYuPvYMt9barpxpsiCQ2sJLKkmVOEMhkeQ5GbtmloK68ENQNPgYicHtC4zPD3SdU+mBtxw9qCM+ncydnDHKOZJDFphjta76+hBYZgPlHDPus5TAJh6PqEi9RyYrJGMbUXACjr57BVGDGsZY2HDnZmrPPdA7LZD/s7C0aOrtQUHMI6aAb2vsxnA77XFLT+RuCJRNgyUXYtBLIsozE0gokSy1EegnGqPdaJ3Gl5wEKI++AuBewWLGkVmPC/WE294KBxsbGqNPpFC6XS1Ae2qobGDuncv5pUOTHz3sVwqjnz8Etn8/XR2ua8Dz/V+mKiK8HRvYXDXcjk17AOtWSawrVMS9t5zZ6Oyrvm/YU3a0qZaoqzyH5nSGWUPTshuiVtnudfR0H7qSW528rulRtOCLW01Y3e/QbBKBEL0GVKsYAAAAASUVORK5CYII="
//   }, {
//     "id": 25,
//     "first_name": "Juice - Orangina",
//     "description": "Dinan",
//     "price": "1000[1-9]5[^0-9]",
//     "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIzSURBVDjLhZNLbxJRGIZP22la6KLpou1GN11QKGW4DFTH1phorZcYi8R6w2ooAlUSjUStC39A49I/4sK9f8OFLoyCwZAAgsMwc87x9RuoSXWgLt7MvGfO+3zfnAsDwAaJT0094+PjlojHTc7YpWHz/g4x5hELCx16Qm5eg9zOQGZzEMeOQyQSsLze8v8Ab2TqOuTT55C5R5CPS5ClPYhsAfJJCXY0htbkZH4ggFp+LYIq5I00RDoDQz+DRlxHM3YSxsoq+K27EDt5WDMzlsmY5gIIn0/Il6+ocpECazDip2BrOuzYCViRBMzoCgT9El+/gEYgUHN3MDLSlMktCFKTQk5QRCgUjoOHYugsRyC3bqObvodv09NlF8DWtKYsvYDM5NCmijycgFA1iOUoeDAMM6BCXEmiq6+ioihv3YC5OdlbtJ0cOlHqgKryYAR8SYXtD/UAMr+LzvZ9VP3+7y6AMT//rq1R1UIRfOMyTAKYTnAxSOEQOLXe2kziq28RHxnbG7iNrdnZ991kCuJmGnK3CJmiNblKPvOAdiCHaiSKT4pybug5qDO2VB4bQ23tNIyNi+CFhzDObqC+fh5lVcXnQIAfeZB68nqloSiojI7ii67jA73XJibQIG8zJo8GeDxZUAeShi3ST+fzP/4HY9nhAMYscTC5Q2oxViFfOeQdgDUQ8IuxO04l+wBg9kP75PcP+V4XbZrrAlC4TmpRxarTBV0sy3ZuZ18W78OrpBYB639yvwHcmnk0jmx5QwAAAABJRU5ErkJggg=="
//   }]



// async function listProducts()
// {
//   const provider = new ethers.BrowserProvider(window.ethereum);
//   const SecureCart = await new ethers.Contract(
//     "0xA25F490787B456D1e48b53A0a7C16a7E438aBCb6",
//     abi.abi,
//     provider
//   );

//   const tokenName = await SecureCart.listProducts();

//   console.log(tokenName);

//   const ESPData = tokenName.map((product) => ({
//     product_id: product.id.toString(),
//     product_name: product.name,
//     product_price: product.price.toString(),
//     product_quantity: product.quantity.toString(),
//     product_description: product.description,
//     product_image: product.imageUrl,
//     product_category: product.category,
//     product_owner: product.seller,
//   }));
//   console.log(ESPData);
//   setProducts(ESPData);
// }



export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => async () =>  {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const SecureCart = await new ethers.Contract(
      "0xA25F490787B456D1e48b53A0a7C16a7E438aBCb6",
      abi.abi,
      provider
    );
  
    const tokenName = await SecureCart.listProducts();
  
    console.log(tokenName);
    
    console.log(products);

    const ESPData = tokenName.map((product) => ({
      product_id: product.id.toString(),
      product_name: product.name,
      product_price: product.price.toString(),
      product_quantity: product.quantity.toString(),
      product_description: product.description,
      product_image: product.imageUrl,
      product_category: product.category,
      product_owner: product.seller,
    }));
    console.log(ESPData);
    setProducts(ESPData);
  }, []);
  return (
    <Row className='justify-content-md-center'>
        {products.map((product) => (
            <ProductCard 
                key = {product.product_id}
                title={product.product_name}
                description={product.product_description}
                price={product.product_price}
                image={product.product_image}
            />
        )
        )}
    </Row>
  )
}
