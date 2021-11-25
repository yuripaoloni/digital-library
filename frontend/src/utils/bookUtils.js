import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import LocalLibrarySharpIcon from "@mui/icons-material/LocalLibrarySharp";
import AutoStoriesSharpIcon from "@mui/icons-material/AutoStoriesSharp";
import CalendarTodaySharpIcon from "@mui/icons-material/CalendarTodaySharp";
import DescriptionSharpIcon from "@mui/icons-material/DescriptionSharp";
import ListAltSharpIcon from "@mui/icons-material/ListAltSharp";

/**
 * ? id, remoteId, title, author non vengono restituiti nella scheda libro
 */

export const getBookIcons = (key) => {
  switch (key) {
    case "genre":
      return <ListAltSharpIcon />;
    case "language":
      return <LanguageSharpIcon />;
    case "library":
      return <LocalLibrarySharpIcon />;
    case "pages":
      return <AutoStoriesSharpIcon />;
    case "plot":
      return <DescriptionSharpIcon />;
    case "year":
      return <CalendarTodaySharpIcon />;
    default:
      break;
  }
};

export const formatBookKeys = (key) => {
  switch (key) {
    case "genre":
      return "Genere";
    case "language":
      return "Lingua";
    case "library":
      return "Biblioteca";
    case "pages":
      return "Pagine";
    case "plot":
      return "Trama";
    case "title":
      return "Titolo";
    case "year":
      return "Anno";
    default:
      break;
  }
};
