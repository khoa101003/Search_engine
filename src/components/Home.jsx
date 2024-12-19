import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/localStorageService";
import Header from "./header/Header";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import List from './list/list';
import Data from '../searchEngine/Data'
import AhoCorasick from '../searchEngine/AhoCorasick';
import Papa from 'papaparse';
import SplitInput from '../searchEngine/SplitInput';


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const searchInput = "D";
const initPatterns = ['her', 'she', 'us', 'khoa', 'bk', 'he']; // Define your patterns here
const searchResult = []; // {{ edit_2 }} Define your data here];
const pathInput = '/chuyen_khoan.csv';
export default function Home() {
  const [searchValue, setSearchValue] = useState(searchInput);
  const [filteredResults, setFilteredResults] = useState(searchResult);
  const [mergedData, setMergedData] = useState('');
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [andSearch, setAndSearch] = useState(false);

  const [data, setData] = useState();
  const splitInput = new SplitInput();
  const handleSearch = (value, patterns) => {
    console.log("Searching...")
    const ahoCorasick = new AhoCorasick(patterns); // Create an instance of Aho-Corasick
    console.log("Create classcomplete...")
    const results = ahoCorasick.search(value);
    console.log("Type: " + results)
    const new_results = results.map(ans => data.get(ans))
    setFilteredResults(new_results)
    //const matchedResults = results.map(result => searchResult[result.pattern]);
    //setFilteredResults(matchedResults);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { // Check if the pressed key is Enter
      setLoading(true);
      console.log(loading);
      if (searchValue.includes('^')) setAndSearch(true);
      else setAndSearch(false);
      setPatterns(splitInput.get(searchValue));
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [patterns]);
  useEffect(() => {
    if (patterns[0] !== '') handleSearch(mergedData, patterns);
  }, [mergedData, patterns]);
  useEffect(() => {
    console.log("fetch data");
    fetch(pathInput)
      .then(response => response.text())
      .then(csvData => {
        // Parse the CSV data
        Papa.parse(csvData, {
          header: true, // Use the first row as header
          skipEmptyLines: true, // Skip empty lines
          complete: (results) => {
            // Merge the data into a single string
            const mergedString = results.data.map(item => {
              //console.log(item);
              return `#${item.date_time}^${item.trans_no}^${item.credit}^${item.detail}#`;
            }).join(''); // Join with a separator

            setMergedData(mergedString); // Set the merged string to state
            //console.log('Length of string: ', mergedString.length)
            setData(new Data(mergedString));
            console.log('Merged string: ', mergedString);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
          }
        });
      })
      .catch(error => {
        console.error("Error fetching CSV:", error);
      });
  }, [pathInput]);

  return (
    <>
      <Header></Header>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor={"#f0f2f5"}
      >
        <Card
          sx={{
            minWidth: 350,
            maxWidth: 500,
            boxShadow: 4,
            borderRadius: 4,
            padding: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              gap: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: 18,
                mb: "40px",
              }}
            >
              Enter keyword then enter to search!!!!
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={searchValue}
                onChange={(e) => { setSearchValue(e.target.value); }}
                onKeyDown={handleKeyDown}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {/*<Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  width: "100%", // Ensure content takes full width
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  User Id
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                  }}
                >
                  {userDetails.id}
                </Typography>
              </Box>*/}
          </Box>
        </Card>
        {loading ? <Typography sx={{ color: 'blue' }}>Loading...</Typography> : <List data={filteredResults} andSearch={andSearch} size={patterns.length}/>}
      </Box>
    </>
  );
}
