from django.shortcuts import render
from decouple import config
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests

jso = {
    "suggestions": [
        {
            "name": "Naroda",
            "mapbox_id": "dXJuOm1ieHBsYzpyMzdxYXc",
            "feature_type": "locality",
            "place_formatted": "Ahmedabad, Ahmedabad, Gujarat, India",
            "context": {
                "country": {
                    "id": "dXJuOm1ieHBsYzpJbXM",
                    "name": "India",
                    "country_code": "IN",
                    "country_code_alpha_3": "IND"
                },
                "region": {
                    "id": "dXJuOm1ieHBsYzpKR3M",
                    "name": "Gujarat",
                    "region_code": "GJ",
                    "region_code_full": "IN-GJ"
                },
                "district": {
                    "id": "dXJuOm1ieHBsYzpobXM",
                    "name": "Ahmedabad"
                },
                "place": {
                    "id": "dXJuOm1ieHBsYzpCSWhy",
                    "name": "Ahmedabad"
                }
            },
            "language": "en",
            "maki": "marker",
            "metadata": {},
            "distance": 3600
        },
        {
            "name": "Naroda GIDC",
            "mapbox_id": "dXJuOm1ieHBvaTowMmM2MTVkOC01ZmY0LTRlZDAtYjg1Zi1jZDlmYmNkNDMwYzQ",
            "feature_type": "poi",
            "address": "Naroda Road",
            "full_address": "Naroda Road, Ahmedabad, 382340, India",
            "place_formatted": "Ahmedabad, 382340, India",
            "context": {
                "country": {
                    "name": "India",
                    "country_code": "IN",
                    "country_code_alpha_3": "IND"
                },
                "postcode": {
                    "id": "dXJuOm1ieHBsYzpBbWJPYXc",
                    "name": "382340"
                },
                "place": {
                    "id": "dXJuOm1ieHBsYzpCSWhy",
                    "name": "Ahmedabad"
                }
            },
            "language": "en",
            "maki": "marker",
            "poi_category": [
                "factory"
            ],
            "poi_category_ids": [
                "factory"
            ],
            "external_ids": {
                "foursquare": "4ed7081c0e6145a390634aa1"
            },
            "metadata": {},
            "distance": 4600
        },
        {
            "name": "Naroda Patiya",
            "mapbox_id": "dXJuOm1ieHBsYzpCb2tNYXc",
            "feature_type": "neighborhood",
            "place_formatted": "Naroda, Ahmedabad, Ahmedabad, Gujarat, India",
            "context": {
                "country": {
                    "id": "dXJuOm1ieHBsYzpJbXM",
                    "name": "India",
                    "country_code": "IN",
                    "country_code_alpha_3": "IND"
                },
                "region": {
                    "id": "dXJuOm1ieHBsYzpKR3M",
                    "name": "Gujarat",
                    "region_code": "GJ",
                    "region_code_full": "IN-GJ"
                },
                "postcode": {
                    "id": "dXJuOm1ieHBsYzpBbWJ1YXc",
                    "name": "382345"
                },
                "district": {
                    "id": "dXJuOm1ieHBsYzpobXM",
                    "name": "Ahmedabad"
                },
                "place": {
                    "id": "dXJuOm1ieHBsYzpCSWhy",
                    "name": "Ahmedabad"
                },
                "locality": {
                    "id": "dXJuOm1ieHBsYzpyMzdxYXc",
                    "name": "Naroda"
                }
            },
            "language": "en",
            "maki": "marker",
            "metadata": {},
            "distance": 3300
        },
        {
            "name": "Naroda Patiya",
            "mapbox_id": "dXJuOm1ieHBvaTpkNGYxYTk3MC1hNjhmLTQwM2MtOGE4ZC1iYTljNzI0ZmYyMDY",
            "feature_type": "poi",
            "address": "Ahmedabad",
            "full_address": "Ahmedabad, 382345, India",
            "place_formatted": "382345, India",
            "context": {
                "country": {
                    "name": "India",
                    "country_code": "IN",
                    "country_code_alpha_3": "IND"
                },
                "postcode": {
                    "id": "dXJuOm1ieHBsYzpBbWJ1YXc",
                    "name": "382345"
                },
                "place": {
                    "id": "dXJuOm1ieHBsYzpCSWhy",
                    "name": "Ahmedabad"
                }
            },
            "language": "en",
            "maki": "monument",
            "poi_category": [
                "historic site",
                "monument",
                "tourist attraction"
            ],
            "poi_category_ids": [
                "historic_site",
                "monument",
                "tourist_attraction"
            ],
            "external_ids": {
                "foursquare": "4d40d08fadb6236a3b038c40"
            },
            "metadata": {},
            "distance": 3400
        },
        {
            "name": "Naroda Industries Association",
            "mapbox_id": "dXJuOm1ieHBvaTpjNDBhYjMxNS1iYzg3LTQ2NzAtYjBjMy05ZjY5Y2I3YjQxZjg",
            "feature_type": "poi",
            "address": "Sheth Shantilal Kapashi Hall",
            "full_address": "Sheth Shantilal Kapashi Hall, Ahmedabad, 382330, India",
            "place_formatted": "Ahmedabad, 382330, India",
            "context": {
                "country": {
                    "name": "India",
                    "country_code": "IN",
                    "country_code_alpha_3": "IND"
                },
                "postcode": {
                    "id": "dXJuOm1ieHBsYzpBbWF1YXc",
                    "name": "382330"
                },
                "place": {
                    "id": "dXJuOm1ieHBsYzpCSWhy",
                    "name": "Ahmedabad"
                },
                "neighborhood": {
                    "id": "dXJuOm1ieHBsYzpDejJzYXc",
                    "name": "Vasant Vihar 2"
                },
                "street": {
                    "name": "naroda"
                }
            },
            "language": "en",
            "maki": "marker",
            "poi_category": [],
            "poi_category_ids": [],
            "external_ids": {
                "foursquare": "13b3c1e21cf74e84b16084ca"
            },
            "metadata": {},
            "distance": 3200
        },
        {
            "name": "Naroda Road, Memco",
            "mapbox_id": "dXJuOm1ieHBvaTo4NWYwZDAwMi0wNjVjLTRjOGEtOGQzZi0wMGM2NTBkMWJlMDA",
            "feature_type": "poi",
            "address": "Ahmedabad",
            "full_address": "Ahmedabad, 382330, India",
            "place_formatted": "382330, India",
            "context": {
                "country": {
                    "name": "India",
                    "country_code": "IN",
                    "country_code_alpha_3": "IND"
                },
                "postcode": {
                    "id": "dXJuOm1ieHBsYzpBbWF1YXc",
                    "name": "382330"
                },
                "place": {
                    "id": "dXJuOm1ieHBsYzpCSWhy",
                    "name": "Ahmedabad"
                },
                "neighborhood": {
                    "id": "dXJuOm1ieHBsYzpCYkpNYXc",
                    "name": "Makarpura"
                }
            },
            "language": "en",
            "maki": "marker",
            "poi_category": [
                "mechanic",
                "services"
            ],
            "poi_category_ids": [
                "auto_repair",
                "services"
            ],
            "external_ids": {
                "foursquare": "a65a5c3033b8428be8e1e4ab"
            },
            "metadata": {},
            "distance": 3600
        },
        {
            "name": "Naroda Enterprise",
            "mapbox_id": "dXJuOm1ieHBvaTplNWU3NjQyYy0wMTNkLTRhNDQtODJmYi1mYTAzZDdlNDU1MTE",
            "feature_type": "poi",
            "address": "Galaxy Road",
            "full_address": "Galaxy Road, Ahmedabad, 382330, India",
            "place_formatted": "Ahmedabad, 382330, India",
            "context": {
                "country": {
                    "name": "India",
                    "country_code": "IN",
                    "country_code_alpha_3": "IND"
                },
                "postcode": {
                    "id": "dXJuOm1ieHBsYzpBbWF1YXc",
                    "name": "382330"
                },
                "place": {
                    "id": "dXJuOm1ieHBsYzpCSWhy",
                    "name": "Ahmedabad"
                },
                "neighborhood": {
                    "id": "dXJuOm1ieHBsYzpCYkpNYXc",
                    "name": "Makarpura"
                },
                "street": {
                    "name": "galaxy road"
                }
            },
            "language": "en",
            "maki": "marker",
            "poi_category": [
                "services",
                "shipping store"
            ],
            "poi_category_ids": [
                "services",
                "shipping_store"
            ],
            "external_ids": {
                "foursquare": "cb4fa2eca2524b9cc4a0a90f"
            },
            "metadata": {},
            "distance": 3800
        },
        {
            "name": "Naroda Industries Association",
            "mapbox_id": "dXJuOm1ieHBvaTo1Njg0YTE3Ny01YWI3LTQ5NzgtOTBhNy00ZjVhYWFhYmEwOWE",
            "feature_type": "poi",
            "address": "Shyam Prasad Vasavada Road",
            "full_address": "Shyam Prasad Vasavada Road, Ahmedabad, 382330, India",
            "place_formatted": "Ahmedabad, 382330, India",
            "context": {
                "country": {
                    "name": "India",
                    "country_code": "IN",
                    "country_code_alpha_3": "IND"
                },
                "postcode": {
                    "id": "dXJuOm1ieHBsYzpBbWF1YXc",
                    "name": "382330"
                },
                "place": {
                    "id": "dXJuOm1ieHBsYzpCSWhy",
                    "name": "Ahmedabad"
                },
                "neighborhood": {
                    "id": "dXJuOm1ieHBsYzpCYkpNYXc",
                    "name": "Makarpura"
                },
                "street": {
                    "name": "shyam prasad vasavada road"
                }
            },
            "language": "en",
            "maki": "marker",
            "poi_category": [
                "outdoors",
                "states and municipalities"
            ],
            "poi_category_ids": [
                "outdoors",
                "states_and_municipalities"
            ],
            "external_ids": {
                "foursquare": "9102cea58bb54b4ba1456cc3"
            },
            "metadata": {},
            "distance": 3700
        },
        {
            "name": "Naroda Patia Circle",
            "mapbox_id": "dXJuOm1ieHJldDo2cERuX2VlOThRUEZwM1h2RTNKcjZEUk82TVpCdU9IRWgtRldBWUREV3JIOFBNNW83XzViZFJQaS13a0tBaUJqclFqdkpzNjZJb1hXNzY5R0NpUnVjelB2TmxfVjRDcHZQZVpWcEZ3c0dTbFFMdnVRcmE0aTkySVdNN3BJYjRXWi1hMjhGRUpIQUc1enpLTUFFbzNwc05MSGRwR0x1ckF6Z2Z4M3VmN2EteldiU0l4MHB0U3dwRXNEamVETW56aEN3ZFl4OVpQN0JhdHRIMXYtTE82cDU1NVprcFduZ1FUT1d3Zzh5S1FHVVFhTmh4N0tFVk9abm1Lb0JVT01PZjJHUW04STVLZHFTb2dsU1JHN0tWdUIwbmw5bnZHZTN4eHlzN3lSaENXMWphQ0xmcGFEUzAzdVF4SUhmNTZzbnF0dU54U1NPY2NuX09CZkpmSElZTTBURnlGVWdHQ2k0MDhmX0MtYkg3dnJLZ3dNdXRhTzFvR3BRQ3RLekhseU5IaGZEQ3NSNldPS2dHa3RrQzhEYmZyZEEtRndwaDJvWkQ0RU11SE02ZHhVQXBSQjFYRHBGOWFiNVBuM0VEUVM1ZGU4YVZuTFo2OHVZRTZwVmVfVUtQNGFGdk9zS3I3cm1JSy10M2lrOWdzRk9wQ2M2OVpqSDhDRXJweDdpbG4tYkJmdno3ekF4NHAyV2p3LXpfLXdCREpmSUVHNm1iejAtaklqdUpEWTFfQXlJWXBPREZyM3BHVy04bV83UHJ1RnRJdDlvUFlBQm1PNk1JM0lJc3NFcEZvTGlyYnVxM0k0ZnIyRE9wMGxGNHV0SXRuWUxLNzd6Mnl2VE9qMWFkeEFSaVVQNnhqNDg5MzJvM3A1dFpNU0xfOWEwVkJxREJkN1hVYkxTVzhDdlduZWpHQzlQQ2V2dkpfRVhSYm5ObGwzalNtdlNPLTNTeUY5TjloMEN5NVBsMDBmM2hSRkJrLW9NOXF4clZ3OVZwNTZmaE9qNHI1ak1CNTI0YXZ1UXJRUkdmUllrclpwUmxKWkJ6OEt2TDZhMHR0R29sbkNkak5Cd0JLVkdqY0labEhvU3ZpdWtFdEp6VzhEQ3NiSUNDWVZHdFlQSnZYVE85NXNPbzBfeDBJM01xV2kzMDVrTEZfM0pMTHV1RG82RWlyQ1dPWDlldllidDlUbTltbks2VDZ6UEh3YWtmcGQ3WTM3TnZFaTJfOUdpU21BU3ZvZzY0NzVHQncxLUotclk1U0RaSVk3a0ZnbGVYZHRFRnVMdTRBdFJZSEF3ZU9VelN1SG13b3hIbVZFdVhYa2w1UkkwYklLTkk1RFN2Vk9ncWlibzJodl9KU29oZ1VZMnlFblFTeXJpNmEzaU1jckhkUlRDVVhFQkNWc1hVeFpTc2xoczVoVXFCMU50TF9fQ21tTUdHY2cwelMzdEFmdEp1LTNXVXJoUU5Bd0h3R0NUbG4wQzBnNTBBeHFoemlFbXJnWWlvd0czSTFhZjRKcFNoWWpvZkY4NGNyeVUxMDVLbmRhUjVoRWpTODBjQkRYU0lzUWplV0lCRDc2cldMZzgxMmNmU044eHhMZDRwZjY5UFZSLURpZ09vOHFqTWdMOFYxQWM4aTdkd2Vma1ZFS3NRQVFsdkd6S1FLVmt3V091VVdQMjBGSk9GUEwzYk0tNU1rNGNlS2JkNXY0Q2o4Z0pZTUd3YTBZc0hMdDY0VlBsT3dpWTNocGN0RG9Idm9OWjJURWZyeUIySW5BM3lyT1V4UXFUNVEyX0hsdVQ2aVlSeC1HbExGeE4ydVJ4VVN1VzdadzFndzYwNWZScUVvUTdaOFBueUQ5VG14UzdaYnVSTklsZlBQbXIxQ3JvQ3BnbG9iZUw4TGJmZGtUUG93cnVHOVhLQ3R4RTlfTW50azQtdTFqSUpSSDdhWTlCVF92MUNiaHdvNUt3ZVVwUURsQXBvMFdDX3p3WEdiakhTUGU5UDAxMW1xejVsM3dKNU5GMVVydUtLQUMyZ2dySUlCc3RXc3ViXzFVaDdUNVFiSHRsZ2d1QUtUcHRyY2Y5MU1hamZIeVFPX1dSSzIwcWdaZjRnUEFCanJaYTJkUXhPazNpTTZiYjBNdGtPbnY4U1VnaE1wd184SDBzekRRWWhMbkRLYzNWeEtsLUh2RFBnSXZFVjgyUXNiYjIyRWVNYWNGYWV0U0ZnZTNFckNrUTc4N3lZRWlTV3dCLS1tNy1iUDF4dnF4cVpab2pYNzdocXpNdWpPWXkzMEVESmNCZTFMQkpqTUdhMXJINEp6WTRJMVFhSE1SYzVtNThfOElNVy1YTW85Wjk1RlJEeEQ2Zk1lTmFSbVlFcTd4N1ZGbGtWRjJvb25EbW1FX2lRSElrQjZncndRcFFMdUtENmg5MVVIMjhVcTZ2X2I1RVVBWjUxQWtoWUNqVk5BZmpvOVNzNTQ4NEtualhtSl9vNDlWUVNCY2lHYmZsMEcwazlTNG1TcC0yMWR5SHVlc0VRcFBHNVJHNV9FelhMU2YzcFFGWk9qeEFmaUFRWFZtNkliOVRpdENnYzdib0dtLUMxLWxXVVB3WVQ2cGp6RlNFOFdCUVpSaEdRZUhjM3hBYlRmOFNXM0tMWG5ZSlA5Q0xpNFpaS01lQUpSTGY0eFNwVTU2VktCbHoyQU9vT3I3WmNqNlBhN1ZyNlBhR1hZbFctWFZyeTBkWHBQdzAySTREYnBHV01nV1JSbFZYcFlDek1lMmp5VDF1emo3dkJCZk1iUF9RN1dDY2Q1ZmdEdG5ra0dXMU9lQ2NCZFJsZEw2VEJQM0oxNDBfSlAzRGNoUzBVdW5uZVhHdzdCanJvb01iMy00NFFfOGYwXzdhVjlLbjVaUW5kSThSMzV1VHNPX0lRMUc3WXZQRFJMN3d6MmZWd2FQMHg2R2NxQ0hRWHBaLXlOYzVVeWppUm0tbklUMUxjU1pUVUt3cnp5UEJMVWJ6bjBsZGU2bURkNXlIMHdlekZQS3A3NEtfVWlBNXF3RFlIQ0NRLTJ0UkN1YVZ4QlkyWnNjemtUdGdqSE9OUlRuOXNvbldYN3B2bjBtOXVZRHpKRU0yS2Zaek4yeGhPZnZEdkJRZ1N6Y085NlQ5TDNkeEY4dHlhVWVMcHFBeEVCcDBfVmdYSVpsaF9FS0l3NnRYaWktaGQzZ0cwLVc=",
            "feature_type": "street",
            "place_formatted": "382345, Naroda, Ahmedabad, Ahmedabad, Gujarat, India",
            "context": {
                "country": {
                    "id": "dXJuOm1ieHBsYzpJbXM",
                    "name": "India",
                    "country_code": "IN",
                    "country_code_alpha_3": "IND"
                },
                "region": {
                    "id": "dXJuOm1ieHBsYzpKR3M",
                    "name": "Gujarat",
                    "region_code": "GJ",
                    "region_code_full": "IN-GJ"
                },
                "postcode": {
                    "id": "dXJuOm1ieHBsYzpBbWJ1YXc",
                    "name": "382345"
                },
                "district": {
                    "id": "dXJuOm1ieHBsYzpobXM",
                    "name": "Ahmedabad"
                },
                "place": {
                    "id": "dXJuOm1ieHBsYzpCSWhy",
                    "name": "Ahmedabad"
                },
                "locality": {
                    "id": "dXJuOm1ieHBsYzpyMzdxYXc",
                    "name": "Naroda"
                },
                "street": {
                    "id": "dXJuOm1ieHJldDo2cERuX2VlOThRUEZwM1h2RTNKcjZEUk82TVpCdU9IRWgtRldBWUREV3JIOFBNNW83XzViZFJQaS13a0tBaUJqclFqdkpzNjZJb1hXNzY5R0NpUnVjelB2TmxfVjRDcHZQZVpWcEZ3c0dTbFFMdnVRcmE0aTkySVdNN3BJYjRXWi1hMjhGRUpIQUc1enpLTUFFbzNwc05MSGRwR0x1ckF6Z2Z4M3VmN2EteldiU0l4MHB0U3dwRXNEamVETW56aEN3ZFl4OVpQN0JhdHRIMXYtTE82cDU1NVprcFduZ1FUT1d3Zzh5S1FHVVFhTmh4N0tFVk9abm1Lb0JVT01PZjJHUW04STVLZHFTb2dsU1JHN0tWdUIwbmw5bnZHZTN4eHlzN3lSaENXMWphQ0xmcGFEUzAzdVF4SUhmNTZzbnF0dU54U1NPY2NuX09CZkpmSElZTTBURnlGVWdHQ2k0MDhmX0MtYkg3dnJLZ3dNdXRhTzFvR3BRQ3RLekhseU5IaGZEQ3NSNldPS2dHa3RrQzhEYmZyZEEtRndwaDJvWkQ0RU11SE02ZHhVQXBSQjFYRHBGOWFiNVBuM0VEUVM1ZGU4YVZuTFo2OHVZRTZwVmVfVUtQNGFGdk9zS3I3cm1JSy10M2lrOWdzRk9wQ2M2OVpqSDhDRXJweDdpbG4tYkJmdno3ekF4NHAyV2p3LXpfLXdCREpmSUVHNm1iejAtaklqdUpEWTFfQXlJWXBPREZyM3BHVy04bV83UHJ1RnRJdDlvUFlBQm1PNk1JM0lJc3NFcEZvTGlyYnVxM0k0ZnIyRE9wMGxGNHV0SXRuWUxLNzd6Mnl2VE9qMWFkeEFSaVVQNnhqNDg5MzJvM3A1dFpNU0xfOWEwVkJxREJkN1hVYkxTVzhDdlduZWpHQzlQQ2V2dkpfRVhSYm5ObGwzalNtdlNPLTNTeUY5TjloMEN5NVBsMDBmM2hSRkJrLW9NOXF4clZ3OVZwNTZmaE9qNHI1ak1CNTI0YXZ1UXJRUkdmUllrclpwUmxKWkJ6OEt2TDZhMHR0R29sbkNkak5Cd0JLVkdqY0labEhvU3ZpdWtFdEp6VzhEQ3NiSUNDWVZHdFlQSnZYVE85NXNPbzBfeDBJM01xV2kzMDVrTEZfM0pMTHV1RG82RWlyQ1dPWDlldllidDlUbTltbks2VDZ6UEh3YWtmcGQ3WTM3TnZFaTJfOUdpU21BU3ZvZzY0NzVHQncxLUotclk1U0RaSVk3a0ZnbGVYZHRFRnVMdTRBdFJZSEF3ZU9VelN1SG13b3hIbVZFdVhYa2w1UkkwYklLTkk1RFN2Vk9ncWlibzJodl9KU29oZ1VZMnlFblFTeXJpNmEzaU1jckhkUlRDVVhFQkNWc1hVeFpTc2xoczVoVXFCMU50TF9fQ21tTUdHY2cwelMzdEFmdEp1LTNXVXJoUU5Bd0h3R0NUbG4wQzBnNTBBeHFoemlFbXJnWWlvd0czSTFhZjRKcFNoWWpvZkY4NGNyeVUxMDVLbmRhUjVoRWpTODBjQkRYU0lzUWplV0lCRDc2cldMZzgxMmNmU044eHhMZDRwZjY5UFZSLURpZ09vOHFqTWdMOFYxQWM4aTdkd2Vma1ZFS3NRQVFsdkd6S1FLVmt3V091VVdQMjBGSk9GUEwzYk0tNU1rNGNlS2JkNXY0Q2o4Z0pZTUd3YTBZc0hMdDY0VlBsT3dpWTNocGN0RG9Idm9OWjJURWZyeUIySW5BM3lyT1V4UXFUNVEyX0hsdVQ2aVlSeC1HbExGeE4ydVJ4VVN1VzdadzFndzYwNWZScUVvUTdaOFBueUQ5VG14UzdaYnVSTklsZlBQbXIxQ3JvQ3BnbG9iZUw4TGJmZGtUUG93cnVHOVhLQ3R4RTlfTW50azQtdTFqSUpSSDdhWTlCVF92MUNiaHdvNUt3ZVVwUURsQXBvMFdDX3p3WEdiakhTUGU5UDAxMW1xejVsM3dKNU5GMVVydUtLQUMyZ2dySUlCc3RXc3ViXzFVaDdUNVFiSHRsZ2d1QUtUcHRyY2Y5MU1hamZIeVFPX1dSSzIwcWdaZjRnUEFCanJaYTJkUXhPazNpTTZiYjBNdGtPbnY4U1VnaE1wd184SDBzekRRWWhMbkRLYzNWeEtsLUh2RFBnSXZFVjgyUXNiYjIyRWVNYWNGYWV0U0ZnZTNFckNrUTc4N3lZRWlTV3dCLS1tNy1iUDF4dnF4cVpab2pYNzdocXpNdWpPWXkzMEVESmNCZTFMQkpqTUdhMXJINEp6WTRJMVFhSE1SYzVtNThfOElNVy1YTW85Wjk1RlJEeEQ2Zk1lTmFSbVlFcTd4N1ZGbGtWRjJvb25EbW1FX2lRSElrQjZncndRcFFMdUtENmg5MVVIMjhVcTZ2X2I1RVVBWjUxQWtoWUNqVk5BZmpvOVNzNTQ4NEtualhtSl9vNDlWUVNCY2lHYmZsMEcwazlTNG1TcC0yMWR5SHVlc0VRcFBHNVJHNV9FelhMU2YzcFFGWk9qeEFmaUFRWFZtNkliOVRpdENnYzdib0dtLUMxLWxXVVB3WVQ2cGp6RlNFOFdCUVpSaEdRZUhjM3hBYlRmOFNXM0tMWG5ZSlA5Q0xpNFpaS01lQUpSTGY0eFNwVTU2VktCbHoyQU9vT3I3WmNqNlBhN1ZyNlBhR1hZbFctWFZyeTBkWHBQdzAySTREYnBHV01nV1JSbFZYcFlDek1lMmp5VDF1emo3dkJCZk1iUF9RN1dDY2Q1ZmdEdG5ra0dXMU9lQ2NCZFJsZEw2VEJQM0oxNDBfSlAzRGNoUzBVdW5uZVhHdzdCanJvb01iMy00NFFfOGYwXzdhVjlLbjVaUW5kSThSMzV1VHNPX0lRMUc3WXZQRFJMN3d6MmZWd2FQMHg2R2NxQ0hRWHBaLXlOYzVVeWppUm0tbklUMUxjU1pUVUt3cnp5UEJMVWJ6bjBsZGU2bURkNXlIMHdlekZQS3A3NEtfVWlBNXF3RFlIQ0NRLTJ0UkN1YVZ4QlkyWnNjemtUdGdqSE9OUlRuOXNvbldYN3B2bjBtOXVZRHpKRU0yS2Zaek4yeGhPZnZEdkJRZ1N6Y085NlQ5TDNkeEY4dHlhVWVMcHFBeEVCcDBfVmdYSVpsaF9FS0l3NnRYaWktaGQzZ0cwLVc=",
                    "name": "Naroda Patia Circle"
                }
            },
            "language": "en",
            "maki": "marker",
            "metadata": {},
            "distance": 3400
        },
        {
            "name": "Naroda Gam Bus Station",
            "mapbox_id": "dXJuOm1ieHJldDo2cEVSX2VlXzhhTEtOQ3hxMG1xejJhU29uejNZVlRTWWVxMVJCY0RqUHJIdExNNWE1OXl3eHBxSTZFQUlFNnpyelE1M3U5ODluV25mX3pjaU1KWjU1OHRvQ29xOEgtVjRqV1VJSjhvbTBmbU9wV0FXUngwcDI2dU5LU21hTURvSTZJMUl3Zy1CdUdvRndpbXBuQzR4Q1M2VWNKNk1QMjJsTXVRRjhsZ25xUkZiU1c2aTV6Y1lOZE82TnlRTkZvRVJPUVBxbWVXYzJrT1Bhek5uVWhFenl3MzBmVko1b3RsZDJyTEhBUnNKdEtaRUdZWmF2a3hmbUdJWE1JOGFxNHhaS2t5QTB1ZkZMOE9ma25aOW5mYzZpQ2NndGlIZk5FSUNFMWZuZHJBbWpCRzhQVWtHMWoySGdrZ1JLMm9Na3pqckNnZ3JIQ1N4NlpESjJRYVhMMmJKbW9RQ1FwQXNzVTdnY1pVWDktSjVkVVJ4cDdvOVpTRDVCYzU2YkhzRlpna1VTZHdqUURXVDk4NWNzWGdHZ25xcnU1Y2E4S3lKaENDN0twcXpET25UcEVWQjJKb3V3NHpwX2RlU3BsMjBSWGRST0ZkUTg1SUJ0RU8xNXFLMTVNU1lQc3dVVlN2Rm16dkhWSlVSR0FjWTN6bnRoMUplUDdyUmNTM1J1VVRBVGpuV3NWT0Y5NEhWS05CS2IydV9JRGtGZmcyRGk1bkZkS0RvNDdvZVlia09IWDZRMTZmRmlWTlhQM2pqbVI1clJjMVpJeEV0OEZnYmxRN0U2UmNqc3ROZVg3U3ZMX2NobUViMFNBVkN3STZKa0lMLTJENXhWTncxZ0xhNWxpQnpYMm4zVjRPcm95M3JQSUlfdTZxa2JVbzdodGc4TlJISExOMlRmUGFhX1FKN2JXWE9jdE1VTk9fUHgwLVlGbUVhLTFNMllmaWxNaHFYQU1YVUlTeWFiYXhHNzQ4WEdZNlVremJWMzVoa3dVTnhzUFhhTHFrVjNyMjRlMnkzaGdSM2tFVkRJdkhvYUVLU2hzamVLeDFzZ0hoQnV2M0xJU1I1clhDbFlkNFR6em5CLWRia3FsS0NIX2prSFVZZ3R5am9xaF9SMlR1Z0VYcGljeHlIN19OTjJKVnd5Rm8tVk83OU1ESjVuem02QklIN2QtQk0ta2JhRllPRUUtZFFJNVltaHF3VzJ5ejlUSHNScm9CQTNuc2w1ZlZlLXJkVDV4dzRGTlBkUHByWnRaN0hXaHZ0UFRmbWJTSllsRlRuOWtMVTBHR0pULWtDcFlhTlY2RU9OY09SbVg3bVJkeG5weEt0SW5fSjdjdERMVzZacWxfMEw2WjVwbHM2Z0V5RlZsdEZLQ2Y2VEJIdjVDaXJ6VE42QzlFZFFra0s2WWxFLTVzRTA1a0R4R1pXb0d1dlNLNm11cTgzTlJQMGNId3h3eXdob0VzalBMRXhPOVVaSF9hR2NESHFxQ0VTeXlCamd0MXBGTDR5NUt6bkJwU3d6UWdmdlRYWng2QU4yV2VHNWVOTXBTUDB5eEJkdU5XMWMzNW9URUlQX1lXVUJJMERwYXBwdm5qMFF3aHBCM2pseW1sTHgxREhkRXphQm1ZbzhRX2JxcUpIYTlZOF9jMXhGS3J1TnNNRmJzU2JzTUdtSGt3bjFLZk9KMTBOM1BjRnVValJoSkRxd2NVNy1HblppWFAzeTJPN1ZPU19lSFNCZVY4WmtwM18td3UzenNwaHpRLVpwY0trQndXQWZxekIwVmtFbE1YOUp1aHNkdXJOY2lwLWhyUVhSUDZfOWp6WTM0by1xR2lIUXlQVUZqUzFsWU9DRWNyWWlIOFc1SVZJVmFrbF9tZmZ6djZjQXdTR2pKbWZGMXZWRXlnbFV2ME9wUXdPdHhRUUV5eEZwRUNtWEVlb0Y1Y0c5elBYenhzN2EycWZyN0RuZkpjckZlUkY5OFF2d0MwdDV6ZXd4NzBldFZqaTAyeEhtQll6cWxuQXQ5NVpsLTc1c3dZN19qUXJfWnFHMFZCM2dSb3VEdDRhanBrRlNwV2NTdUhVTWx6UjJmUDV1Q3llNmhWM1F6WDdBcDNDRExwLV9ld2Rza3VQVmFvTmRvVUxucDVqbHZCS3NKYUtrdGhiTUNNUlZ6Tllpd1RQbWplamVNU3h1TTFBUHRZQTI2LXo1eDJKMGF5N1hDdnQyZTBrYVVzamxUakNzc2RGYlVSTFBVdFo1WURiS1dZSmRIZk1zZmU0RzJOQXNYbjdBNHhObDF5Rm9SZ1JLckJFcXUyNTZLc1N5WEpyX0pucmkwb0Joc19Uc1F6Q3Bnb2gtb1Fmal9PajZnbWN0WWVyYWpTNEg0N0U4X09XdDg5STVySV9MYVc4U21ZQ0R1S25seXFfTVV3RmZWeDhGeXMtWEltNWozVUJ0dnlZRGlZN0N2eHFlaGxvMHRKNWZnTVVKVERWNXZoS1owQWNkeF9oeC1UZFBfdGFhQS1UVVVQbEtpQktiekJpLUl2S2s4WXRCMlNaTzRyOFAxLVdUcE41S3lweVhSMlNpR3diNnZXdHBCQ3hjblhxR1p5T0VaT0FRQXJ4TXJuaEdTTXF3YkNQLU9OUzJUUHNvVnJ5OGxEeGt3QU42SXNJakxrWmctM3kzbEJCSmRGMzhNcUJoUUlQX3NEYmlkMVJmQTM4TV9SMjV4dmhDWnBCOFNCYUVkdGxrUVJ1a21hTWF4eWM4M0VEUlA0dWVWMmp0YkRTZU82OUV3Q2MtcXFUeXVwNEJtbWNteVY3RV9mLTRiWHdlR1VXQWNfUGVQTXpVRHJETklaaTZCOXZVZGFDNlZDbVBzS2haV1kyYUgzRGtaMFZhVDRGSXY2RjdMQVJEZ1NaRG1uX1NES3VVTjdjWXE2b0NPUmN6dXdaRUtPNV8tV1JpVDUycExPaTVCaDA0V253X3lwd1pJbThrM0p1YmZaRHY5Y3FTU2dsQ3RYSnp6VlJnbmEtVEsxSzR0MkJ6REFjUmJYRlJUVmJmSzhmemlRTG4zNE5FNml6aFA5aEVTeU9WMHlvMFJFY0ZYa0VsdFM1SHFJS3k0TTB2Zm5MMktuZHd2d1h0ak0yOXNtTVdfXzZaS0JkWGxNX0M0Q1BfcHJRdkZLc0JtZlBVUV8wWXdDR28tZTJFYV9IcTZ3b1NuUmlFX25fX1JjYVp0c2VCQ0JxTHZncEt3alhPaHJWRURsbzZic2lVMzNJWG9rcVBoNWZpZnpOZW1kQzR3QnpUOVhkek83TA==",
            "feature_type": "street",
            "place_formatted": "Makarpura, 382330, GIDC Naroda, Ahmedabad, Ahmedabad, Gujarat, India",
            "context": {
                "country": {
                    "id": "dXJuOm1ieHBsYzpJbXM",
                    "name": "India",
                    "country_code": "IN",
                    "country_code_alpha_3": "IND"
                },
                "region": {
                    "id": "dXJuOm1ieHBsYzpKR3M",
                    "name": "Gujarat",
                    "region_code": "GJ",
                    "region_code_full": "IN-GJ"
                },
                "postcode": {
                    "id": "dXJuOm1ieHBsYzpBbWF1YXc",
                    "name": "382330"
                },
                "district": {
                    "id": "dXJuOm1ieHBsYzpobXM",
                    "name": "Ahmedabad"
                },
                "place": {
                    "id": "dXJuOm1ieHBsYzpCSWhy",
                    "name": "Ahmedabad"
                },
                "locality": {
                    "id": "dXJuOm1ieHBsYzpWaWNxYXc",
                    "name": "GIDC Naroda"
                },
                "neighborhood": {
                    "id": "dXJuOm1ieHBsYzpCYkpNYXc",
                    "name": "Makarpura"
                },
                "street": {
                    "id": "dXJuOm1ieHJldDo2cEVSX2VlXzhhTEtOQ3hxMG1xejJhU29uejNZVlRTWWVxMVJCY0RqUHJIdExNNWE1OXl3eHBxSTZFQUlFNnpyelE1M3U5ODluV25mX3pjaU1KWjU1OHRvQ29xOEgtVjRqV1VJSjhvbTBmbU9wV0FXUngwcDI2dU5LU21hTURvSTZJMUl3Zy1CdUdvRndpbXBuQzR4Q1M2VWNKNk1QMjJsTXVRRjhsZ25xUkZiU1c2aTV6Y1lOZE82TnlRTkZvRVJPUVBxbWVXYzJrT1Bhek5uVWhFenl3MzBmVko1b3RsZDJyTEhBUnNKdEtaRUdZWmF2a3hmbUdJWE1JOGFxNHhaS2t5QTB1ZkZMOE9ma25aOW5mYzZpQ2NndGlIZk5FSUNFMWZuZHJBbWpCRzhQVWtHMWoySGdrZ1JLMm9Na3pqckNnZ3JIQ1N4NlpESjJRYVhMMmJKbW9RQ1FwQXNzVTdnY1pVWDktSjVkVVJ4cDdvOVpTRDVCYzU2YkhzRlpna1VTZHdqUURXVDk4NWNzWGdHZ25xcnU1Y2E4S3lKaENDN0twcXpET25UcEVWQjJKb3V3NHpwX2RlU3BsMjBSWGRST0ZkUTg1SUJ0RU8xNXFLMTVNU1lQc3dVVlN2Rm16dkhWSlVSR0FjWTN6bnRoMUplUDdyUmNTM1J1VVRBVGpuV3NWT0Y5NEhWS05CS2IydV9JRGtGZmcyRGk1bkZkS0RvNDdvZVlia09IWDZRMTZmRmlWTlhQM2pqbVI1clJjMVpJeEV0OEZnYmxRN0U2UmNqc3ROZVg3U3ZMX2NobUViMFNBVkN3STZKa0lMLTJENXhWTncxZ0xhNWxpQnpYMm4zVjRPcm95M3JQSUlfdTZxa2JVbzdodGc4TlJISExOMlRmUGFhX1FKN2JXWE9jdE1VTk9fUHgwLVlGbUVhLTFNMllmaWxNaHFYQU1YVUlTeWFiYXhHNzQ4WEdZNlVremJWMzVoa3dVTnhzUFhhTHFrVjNyMjRlMnkzaGdSM2tFVkRJdkhvYUVLU2hzamVLeDFzZ0hoQnV2M0xJU1I1clhDbFlkNFR6em5CLWRia3FsS0NIX2prSFVZZ3R5am9xaF9SMlR1Z0VYcGljeHlIN19OTjJKVnd5Rm8tVk83OU1ESjVuem02QklIN2QtQk0ta2JhRllPRUUtZFFJNVltaHF3VzJ5ejlUSHNScm9CQTNuc2w1ZlZlLXJkVDV4dzRGTlBkUHByWnRaN0hXaHZ0UFRmbWJTSllsRlRuOWtMVTBHR0pULWtDcFlhTlY2RU9OY09SbVg3bVJkeG5weEt0SW5fSjdjdERMVzZacWxfMEw2WjVwbHM2Z0V5RlZsdEZLQ2Y2VEJIdjVDaXJ6VE42QzlFZFFra0s2WWxFLTVzRTA1a0R4R1pXb0d1dlNLNm11cTgzTlJQMGNId3h3eXdob0VzalBMRXhPOVVaSF9hR2NESHFxQ0VTeXlCamd0MXBGTDR5NUt6bkJwU3d6UWdmdlRYWng2QU4yV2VHNWVOTXBTUDB5eEJkdU5XMWMzNW9URUlQX1lXVUJJMERwYXBwdm5qMFF3aHBCM2pseW1sTHgxREhkRXphQm1ZbzhRX2JxcUpIYTlZOF9jMXhGS3J1TnNNRmJzU2JzTUdtSGt3bjFLZk9KMTBOM1BjRnVValJoSkRxd2NVNy1HblppWFAzeTJPN1ZPU19lSFNCZVY4WmtwM18td3UzenNwaHpRLVpwY0trQndXQWZxekIwVmtFbE1YOUp1aHNkdXJOY2lwLWhyUVhSUDZfOWp6WTM0by1xR2lIUXlQVUZqUzFsWU9DRWNyWWlIOFc1SVZJVmFrbF9tZmZ6djZjQXdTR2pKbWZGMXZWRXlnbFV2ME9wUXdPdHhRUUV5eEZwRUNtWEVlb0Y1Y0c5elBYenhzN2EycWZyN0RuZkpjckZlUkY5OFF2d0MwdDV6ZXd4NzBldFZqaTAyeEhtQll6cWxuQXQ5NVpsLTc1c3dZN19qUXJfWnFHMFZCM2dSb3VEdDRhanBrRlNwV2NTdUhVTWx6UjJmUDV1Q3llNmhWM1F6WDdBcDNDRExwLV9ld2Rza3VQVmFvTmRvVUxucDVqbHZCS3NKYUtrdGhiTUNNUlZ6Tllpd1RQbWplamVNU3h1TTFBUHRZQTI2LXo1eDJKMGF5N1hDdnQyZTBrYVVzamxUakNzc2RGYlVSTFBVdFo1WURiS1dZSmRIZk1zZmU0RzJOQXNYbjdBNHhObDF5Rm9SZ1JLckJFcXUyNTZLc1N5WEpyX0pucmkwb0Joc19Uc1F6Q3Bnb2gtb1Fmal9PajZnbWN0WWVyYWpTNEg0N0U4X09XdDg5STVySV9MYVc4U21ZQ0R1S25seXFfTVV3RmZWeDhGeXMtWEltNWozVUJ0dnlZRGlZN0N2eHFlaGxvMHRKNWZnTVVKVERWNXZoS1owQWNkeF9oeC1UZFBfdGFhQS1UVVVQbEtpQktiekJpLUl2S2s4WXRCMlNaTzRyOFAxLVdUcE41S3lweVhSMlNpR3diNnZXdHBCQ3hjblhxR1p5T0VaT0FRQXJ4TXJuaEdTTXF3YkNQLU9OUzJUUHNvVnJ5OGxEeGt3QU42SXNJakxrWmctM3kzbEJCSmRGMzhNcUJoUUlQX3NEYmlkMVJmQTM4TV9SMjV4dmhDWnBCOFNCYUVkdGxrUVJ1a21hTWF4eWM4M0VEUlA0dWVWMmp0YkRTZU82OUV3Q2MtcXFUeXVwNEJtbWNteVY3RV9mLTRiWHdlR1VXQWNfUGVQTXpVRHJETklaaTZCOXZVZGFDNlZDbVBzS2haV1kyYUgzRGtaMFZhVDRGSXY2RjdMQVJEZ1NaRG1uX1NES3VVTjdjWXE2b0NPUmN6dXdaRUtPNV8tV1JpVDUycExPaTVCaDA0V253X3lwd1pJbThrM0p1YmZaRHY5Y3FTU2dsQ3RYSnp6VlJnbmEtVEsxSzR0MkJ6REFjUmJYRlJUVmJmSzhmemlRTG4zNE5FNml6aFA5aEVTeU9WMHlvMFJFY0ZYa0VsdFM1SHFJS3k0TTB2Zm5MMktuZHd2d1h0ak0yOXNtTVdfXzZaS0JkWGxNX0M0Q1BfcHJRdkZLc0JtZlBVUV8wWXdDR28tZTJFYV9IcTZ3b1NuUmlFX25fX1JjYVp0c2VCQ0JxTHZncEt3alhPaHJWRURsbzZic2lVMzNJWG9rcVBoNWZpZnpOZW1kQzR3QnpUOVhkek83TA==",
                    "name": "Naroda Gam Bus Station"
                }
            },
            "language": "en",
            "maki": "marker",
            "metadata": {},
            "distance": 3800
        }
    ],
    "attribution": "© 2024 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service. (https://www.mapbox.com/about/maps/)",
    "response_id": "dvCsu_xXi66rMTotPSVuv-BpZZ9hSm0IUTDrnXFEl9dA61bL3_A7Ukx0Y-1M7kEVui9QGxr4IFbuzoOd_MIQ57VG6UYiX8sqclQ6"
}


result = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "coordinates": [
                    72.643203,
                    23.064705
                ],
                "type": "Point"
            },
            "properties": {
                "name": "Naroda Patiya",
                "mapbox_id": "dXJuOm1ieHBvaTpkNGYxYTk3MC1hNjhmLTQwM2MtOGE4ZC1iYTljNzI0ZmYyMDY",
                "feature_type": "poi",
                "address": "Ahmedabad",
                "full_address": "Ahmedabad, 382345, India",
                "place_formatted": "382345, India",
                "context": {
                    "country": {
                        "id": "",
                        "name": "India",
                        "country_code": "IN",
                        "country_code_alpha_3": "IND"
                    },
                    "postcode": {
                        "id": "dXJuOm1ieHBsYzpBbWJ1YXc",
                        "name": "382345"
                    },
                    "place": {
                        "id": "dXJuOm1ieHBsYzpCSWhy",
                        "name": "Ahmedabad"
                    },
                    "locality": {
                        "id": "dXJuOm1ieHBsYzpyMzdxYXc",
                        "name": "Naroda"
                    }
                },
                "coordinates": {
                    "latitude": 23.064705,
                    "longitude": 72.643203,
                    "routable_points": [
                        {
                            "name": "default",
                            "latitude": 23.064643254757335,
                            "longitude": 72.64312995989586
                        }
                    ]
                },
                "language": "en",
                "maki": "marker",
                "poi_category": [
                    "historic site",
                    "monument",
                    "tourist attraction"
                ],
                "poi_category_ids": [
                    "historic_site",
                    "monument",
                    "tourist_attraction"
                ],
                "external_ids": {
                    "foursquare": "4d40d08fadb6236a3b038c40"
                },
                "metadata": {
                    "primary_photo": "https://ir.4sqi.net/img/general/original/521305742_78e9mEiJAuob5Sj-QMP_ddstma2xbbYPqcZwGVRaOQk.png"
                },
                "operational_status": "active"
            }
        }
    ],
    "attribution": "© 2024 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service. (https://www.mapbox.com/about/maps/)"
}

# Create your views here.

@api_view(['GET'])
def getSearchResults(request):
    query_params = request.GET.dict()
    query = request.GET.get('q')
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    print(query_params)

    # lon = 72.6683283
    # lat = 23.0446325

    api_url=f"https://api.mapbox.com/search/searchbox/v1/suggest?q={query}&language=en&limit=10&session_token=[{config('SESSION_TOKEN')}]&proximity={lon},{lat}&country=IN&access_token={config('ACCESS_TOKEN')}"
    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            data = response.json()  # Parse JSON data from the response
            data = dict(data)
            formatted = {
                'suggestions':[]
            }

            for i in data['suggestions']:
                formatted["suggestions"].append({
                    'name': i['name'],
                    'full_address' :  i['full_address'] if 'full_address' in i else i['place_formatted'],
                    'mapbox_id' : i['mapbox_id']
                })
            return Response(formatted)  # Return data as JSON response
        else:
            return Response({'error': 'Failed to fetch data'}, status=response.status_code)
    
    except requests.RequestException as e:
        return Response({'error': str(e)}, status=500)

    # formatted = {
    #     'suggestions':[]
    # }

    # for i in jso['suggestions']:
    #     formatted["suggestions"].append(
    #         {
    #             'name': i['name'],
    #             'full_address' :  i['full_address'] if 'full_address' in i else i['place_formatted'],
    #             'mapbox_id' : i['mapbox_id']
    #         }
    #     )
    # return Response(formatted)



# https://api.mapbox.com/search/searchbox/v1/retrieve/dXJuOm1ieHBvaTpkNGYxYTk3MC1hNjhmLTQwM2MtOGE4ZC1iYTljNzI0ZmYyMDY?session_token=[e528a749-9441-438b-b554-5cb9eb8a1e74]&access_token=pk.eyJ1Ijoia2lydGlyYWowOCIsImEiOiJjbTEzNTFnMmkwdGVqMnJyNXZ3Z24zeG5nIn0.g2tqmDepmvxeKQlFeQrijA

@api_view(['GET'])
def getCoordinates(request):
    id = request.GET.get("id")
    api_url = f"https://api.mapbox.com/search/searchbox/v1/retrieve/{id}?session_token=[{config('SESSION_TOKEN')}]&access_token={config('ACCESS_TOKEN')}"

    # id = "dXJuOm1ieHBvaTpkNGYxYTk3MC1hNjhmLTQwM2MtOGE4ZC1iYTljNzI0ZmYyMDY"

    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            data = response.json()  # Parse JSON data from the response
            data = dict(data)
            formatted = {
                "mapbox_id" : id
            }
            formatted["coordinates"] = {'latitude': data['features'][0]['properties']['coordinates']['latitude'], 'longitude': data['features'][0]['properties']['coordinates']['longitude']}
            return Response(formatted)  # Return data as JSON response
        else:
            return Response({'error': 'Failed to fetch data'}, status=response.status_code)
    
    except requests.RequestException as e:
        return Response({'error': str(e)}, status=500)
    
    # formatted = {
    #     "mapbox_id" : id
    # }
    # formatted["coordinates"] = {'latitude': result['features'][0]['properties']['coordinates']['latitude'], 'longitude': result['features'][0]['properties']['coordinates']['longitude']}
    # print(formatted)
    # return Response(formatted)


@api_view(['GET'])
def getPath(request):
    slon = request.GET.get('slon')
    slat = request.GET.get('slat')
    dlon = request.GET.get('dlon')
    dlat = request.GET.get('dlat')
    api_url = f"https://api.mapbox.com/directions/v5/mapbox/driving/{slon},{slat};{dlon},{dlat}?overview=full&geometries=geojson&access_token={config('ACCESS_TOKEN')}"
    
    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            data = response.json()  # Parse JSON data from the response
            data = dict(data)
            formatted = {
                'distance' : data['routes'][0]['distance'],
                'duration' : data['routes'][0]['duration'],
                'coordinates' : data['routes'][0]['geometry']['coordinates']
            }
            return Response(formatted)  # Return data as JSON response
        else:
            return Response({'error': 'Failed to fetch data'}, status=response.status_code)
    
    except requests.RequestException as e:
        return Response({'error': str(e)}, status=500)