<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;

class ConvertHelper
{

    public function convertInBynary($sourceData)
    {
        return DB::raw("CONVERT(VARBINARY(MAX), '" . $sourceData . "')");
    }
}
