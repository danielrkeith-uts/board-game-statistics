package com.asd.board_game_statistics_api.util;

import java.util.EnumSet;

public class EnumSetUtils {

    public static <E extends Enum<E>> EnumSet<E> fromBitmask(Class<E> enumClass, int mask) {
        EnumSet<E> set = EnumSet.noneOf(enumClass);
        for (E e : enumClass.getEnumConstants()) {
            if ((mask & bitValueOf(e)) != 0) {
                set.add(e);
            }
        }
        return set;
    }

    public static <E extends Enum<E>> int toBitmask(EnumSet<E> set) {
        int mask = 0;
        for (E e : set) {
            mask |= bitValueOf(e);
        }
        return mask;
    }

    private static <E extends Enum<E>> int bitValueOf(Enum<E> e) {
        return 1 << e.ordinal();
    }
}
