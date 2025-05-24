from enum import Enum

class ReligiosityLevel(str, Enum):
    SHOMER_SHABBAT = "shomer_shabbat"
    SHOMER_KASHRUT = "shomer_kashrut"
    KOSHER_STYLE = "kosher_style"
    DOESNT_CARE = "doesnt_care"

class City(str, Enum):
    TEL_AVIV = "tel_aviv"
    RAMAT_GAN = "ramat_gan"
    HERZLIYA = "herzliya"
    GIVAT_SHMUEL = "givat_shmuel"

class SexCategory(str, Enum):
    MALE = "male"
    FEMALE = "female"
    EITHER = "either"

