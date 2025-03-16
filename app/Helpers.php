<?php

if (! function_exists('removeTashkeel')) {
    function removeTashkeel($text) {
        $tashkeel = [
            'ٓ', 'ٔ', 'ّ', 'َ', 'ً', 'ُ', 'ٌ', 'ِ', 'ٍ', 'ْ', 'ّ', 'ٰ', 'ٰ', 'ٔ', 'ۚ', 'ۦ', 'ۡ'
        ];
        return str_replace($tashkeel, '', $text);
    }
}