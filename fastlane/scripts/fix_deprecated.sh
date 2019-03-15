#!/usr/bin/env bash

# Fix Deprecated PropTypes Issue with some Packages
# See - https://github.com/shoutem/ui/issues/424

ROOT=$(git rev-parse --show-toplevel)
REACT_LIB="$ROOT/node_modules/react-native/Libraries"

printf "Copying Deprecated PropTypes for older packages...\n"
cp "$REACT_LIB/DeprecatedPropTypes/DeprecatedViewStylePropTypes.js" "$REACT_LIB/Components/View/ViewStylePropTypes.js"
cp "$REACT_LIB/DeprecatedPropTypes/DeprecatedColorPropType.js" "$REACT_LIB/StyleSheet/ColorPropType.js"
cp "$REACT_LIB/DeprecatedPropTypes/DeprecatedImageStylePropTypes.js" "$REACT_LIB/Image/ImageStylePropTypes.js"
printf "Done.\n"